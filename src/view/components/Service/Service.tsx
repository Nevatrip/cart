import * as React from "react";
import { cn } from "@bem-react/classname";
import { IServiceProps, IServiceState, IDates, IDirections, service } from './index';
import { ApplicationState } from "../../../reducers/index"

import { connect } from 'react-redux';

import { initialService, changeDate, changeDirection, changeTime, changeTickets } from '../../../actions/order';

import { Calendar } from "../Calendar/Calendar";

import "./Service.css";
import { IOneTicket, ICompileTicket} from ".."

const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: '39dycnz5',
  dataset: 'develop',
  token: 'skvoyfx7KcGcy2Z9ratz9tHx0tgiWTUUdKzOX718S8Yg0hjvaCXAcZAZ44NJwrYqfs3AxL2f9uxZhOhZaEyqpXUWRsR1Zj3Tbp5R3y4FFLieMZBAs0zILNDkU5iP62udT10yG8M0tgXixm3n7RnGEoJnEXGpZ1xzYlbpBzUgnCmWNP12lTs5', // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserWarning: true
})

const cnService = cn('Service');
import { ServiceTicket } from "./Ticket/Service-Ticket";
import { throws } from "assert";

class ServiceClass extends React.PureComponent<IServiceProps, IServiceState> {
  constructor(props: IServiceProps){
    super(props)

    this.state = {
      tickets: [],
      service: {},
      order: {},
      id: this.props.id,
    }

    this.handleDate = this.handleDate.bind(this);
    this.handleDirection = this.handleDirection.bind(this);
    this.handleTicket = this.handleTicket.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }
  

  handleDate(date: number) {
    this.props.changeDate(date, this.props.sessionId, this.props.id, this.state.service)
  }

  handleDirection(event: React.ChangeEvent<HTMLSelectElement>) {
    this.props.changeDirection(event.target.value, this.props.sessionId, this.props.id, this.state.service)
  }

  handleTime(time: Date) {
    this.props.changeTime(time, this.props.sessionId, this.props.id, this.state.service)
  }

  handleTicket(ticket: IOneTicket) {
    const tickets = (this.props.order && this.props.order.tickets) ? this.props.order.tickets.filter(item => (item._key !== ticket._key)).concat(ticket) : [ticket]
    this.props.changeTickets(tickets, this.props.sessionId, this.props.id, this.state.service)
  }


  getService() {

    const query = `*[_id == "${this.props.id}"] {title, "directions": directions[]{..., "tickets": tickets[]{..., "category": category->, "ticket": ticket[]->}}}[0]`;
    const params = {}

    return client.fetch(query, params);
  }

  
  componentDidMount() {
    this.getService().then( (response: service) => {
      const newState = { ...this.state };
      newState.service = response;
      newState.order.direction = (response && response.directions) ? response.directions[0]._key : '';
      this.setState( newState );
    } );
  }

  render() {
    const lang: string = 'ru';
    if (!this.state.service) {
      return null;
    }

    const {
      service: {
        title,
        directions,
      },
    } = this.state
    
    const {
      date,
      direction,
    } = this.props.order

    // TODO: update dates on changed direction
    const selectedDirection = directions && directions.filter(item => item._key === direction)[0]

    const dates = selectedDirection && selectedDirection.schedule.flatMap(event => event.actions.map(action => new Date(action.start).toLocaleDateString()));

    const dateInFormst = date && new Date(date)
    const times = date && dateInFormst && selectedDirection && selectedDirection.schedule
      .flatMap(event => event.actions.map(action => new Date(action.start)))
      .filter(item => {
        return item.getFullYear() === dateInFormst.getFullYear() && item.getMonth() === dateInFormst.getMonth() && item.getDate() === dateInFormst.getDate()
      })

    const ticketGroup = selectedDirection && selectedDirection.tickets && selectedDirection.tickets.reduce(function (r, a) {
      r[a.category.name.current] = r[a.category.name.current] || [];
      r[a.category.name.current].push(a);
      return r;
    }, Object.create(null));

    return (
      <div className={cnService()}>
        {title && <h3 className={cnService("Title")}>{title[ lang as any ].name}</h3>}
        {dates && <Calendar dates={dates} onChange={this.handleDate} value={dateInFormst}/>}
        <div className={cnService("Directions")}>
          {
            directions && directions.length > 1
            ? (
                <select onChange={this.handleDirection} value={direction}>
                  {directions.map((direction, index) => (
                    <option value={direction._key} key={direction._key || index}>{direction.title}</option>
                  )) }
                </select>
              )
              : directions && (
                <>
                  <input type="hidden" name="direction" value={directions[0]._key} />
                  <select disabled value={directions[0]._key}>
                    {<option value={directions[0]._key} key={directions[0]._key}>{directions[0].title}</option>}
                  </select>
                </>
              )
          }
        </div>
        <div className={cnService("Times")}>
          <ul>
            {
              times && times.map( (time, index) => {
                return (
                  <li key={time.toLocaleTimeString()}>
                    <label htmlFor={time.toLocaleTimeString()}>
                      <input
                        type="radio"
                        id={time.toLocaleTimeString()}
                        value={time.toLocaleTimeString()}
                        name={title ? (title[ lang as any ].name + direction) : ''}
                        defaultChecked={!index}
                        onChange={() => this.handleTime(time)}
                      />
                      {time.toLocaleTimeString()}
                    </label>
                  </li>
                )
              } )
            }
          </ul>
        </div>
        <div className={cnService("Tickets")}>
          <ul>
            {
              ticketGroup && Object.keys( ticketGroup ).map( category => (
                <li key={category}>
                  <h4>{category}</h4>
                  <ul>
                    {
                      ticketGroup[ category ].map((ticket: any) => {
                        const exist = (this.props.order && this.props.order.tickets) ? this.props.order.tickets.find(item => (item._key === ticket._key)) : null
                        const count = (exist && exist.count) ? exist.count : 0
                        return (<ServiceTicket ticket={ticket} count={count} key={ticket._key} handleTicket={this.handleTicket}/>)
                      })
                    }
                  </ul>
                </li>
              ) )
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState, props: any) => {
  const order = state.order.orders.find(item => (item.id === props.id)) || ({id: props.id})
  return {
    order,
    sessionId: state.session.sessionId
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  serviceUpdate: (payload: IServiceState, sessionId: string) => initialService(dispatch, payload, sessionId),
  changeDate: (payload: any, sessionId: string, id: string, service: service) => changeDate(dispatch, payload, sessionId, id, service),
  changeDirection: (payload: any, sessionId: string, id: string, service: service) => changeDirection(dispatch, payload, sessionId, id, service),
  changeTime: (payload: any, sessionId: string, id: string, service: service) => changeTime(dispatch, payload, sessionId, id, service),
  changeTickets: (payload: any, sessionId: string, id: string, service: service) => changeTickets(dispatch, payload, sessionId, id, service),
});

export const Service = connect(mapStateToProps, mapDispatchToProps)(ServiceClass)
