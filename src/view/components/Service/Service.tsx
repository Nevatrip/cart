import * as React from "react";
import { cn } from "@bem-react/classname";
import { IServiceProps, IServiceState, IDates, IDirections, service } from './index';
import { ApplicationState } from "../../../reducers/index"

import { connect } from 'react-redux';

import { updateService } from '../../../actions/order';

import { Calendar } from "../Calendar/Calendar";

import "./Service.css";
import { ICompileTicket, IOneTicket } from ".."

const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: '39dycnz5',
  dataset: 'develop',
  token: 'skvoyfx7KcGcy2Z9ratz9tHx0tgiWTUUdKzOX718S8Yg0hjvaCXAcZAZ44NJwrYqfs3AxL2f9uxZhOhZaEyqpXUWRsR1Zj3Tbp5R3y4FFLieMZBAs0zILNDkU5iP62udT10yG8M0tgXixm3n7RnGEoJnEXGpZ1xzYlbpBzUgnCmWNP12lTs5', // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserWarning: true
})

import serviceFixtures from './service.json';

const cnService = cn('Service');
import { ServiceTicket } from "./Ticket/Service-Ticket";
import { throws } from "assert";

class ServiceClass extends React.PureComponent<IServiceProps, IServiceState> {
  constructor(props: IServiceProps){
    super(props)

    this.state = {
      orders: null,
      service: {},
      order: {},
      tickets: [],
      id: this.props.id,
    }

    // this.handleOpenDate = this.handleOpenDate.bind(this);
    // this.handleOpenTime = this.handleOpenTime.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDirection = this.handleDirection.bind(this);
    this.handleTicket = this.handleTicket.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  updateFromStore() {
    if (this.props.order) {
      const order = this.props.order || null
      if (order) {
        const {
          service: {
            directions,
          },
          order: {
            date,
          }
        } = this.state
        const selectedDirection = directions && directions.filter(item => item._key === order.direction)[0]
    
        const times = date && selectedDirection && selectedDirection.schedule
          .flatMap(event => event.actions.map(action => new Date(action.start)))
          .filter(time => new Date(date) < time && new Date(date + 1000 * 60 * 60 * 24) >= time);

        console.log(JSON.stringify(selectedDirection && selectedDirection.tickets))
        console.log(JSON.stringify(order.tickets))
        const tickets = order.tickets || []
        this.setState({tickets: tickets.filter(item => {
          console.log('item ', item._key)
          if (selectedDirection) {
            return selectedDirection.tickets.find(elem => {
              console.log('elem ', elem._key)
              return elem._key === item._key
            })
          } else {
            return false
          }
        })})
      }
    }
  }
  
  // handleOpenDate() {
  //   this.setState({ isOpenDate: !this.state.isOpenDate });
  // }

  // handleOpenTime() {
  //   this.setState({ isOpenTime: !this.state.isOpenTime });
  // }

  handleDate(date: number) {
    console.log('handleDate')
    const cur = new Date(date)
    this.setState({
      tickets: [],
      order: {
        ...this.state.order,
        date: new Date(cur.getFullYear(), cur.getMonth(), cur.getDate()).valueOf()
      }
    }, this.updateFromStore)
  }

  handleDirection(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log('handleDirection')
    this.setState({
      tickets: [],
      order: {
        ...this.state.order,
        direction: event.target.value
      }
    }, this.updateFromStore)
  }

  handleTime(time: Date) {
    console.log('handleTime')
    this.setState({
      tickets: [],
      order: {
        ...this.state.order,
        time: time
      }
    }, this.updateFromStore)
  }

  handleTicket(ticket: IOneTicket) {
    const tickets = this.state.tickets.filter(item => (item._key !== ticket._key)).concat(ticket)
    this.setState({tickets}, () => {
      this.props.serviceUpdate({...this.state}, this.props.sessionId)
    })
  }


  getService() {

    const query = `*[_id == "${this.props.id}"] {title, "directions": directions[]{..., "tickets": tickets[]{..., "category": category->, "ticket": ticket[]->}}}[0]`;
    const params = {}

    return client.fetch(query, params);
  }

  componentWillReceiveProps (newProps: IServiceProps) {
    if (this.state.orders !== newProps.order) {
      this.setState({
        orders: newProps.order
      }, this.updateFromStore)
    }
  }
  
  componentDidMount() {
    this.getService().then( (response: service) => {
      const newState = { ...this.state };
      newState.service = response;
      newState.order.direction = response.directions ? response.directions[0]._key : '';
      this.setState( newState );
    } );
  }

  render() {
    const lang: string = 'ru';

    const {
      service: {
        title,
        directions,
      },
      order: {
        isOpenDate,
        isOpenTime,
        date,
        direction,
      }
    } = this.state

    // TODO: update dates on changed direction
    const selectedDirection = directions && directions.filter(item => item._key === direction)[0]

    const dates = selectedDirection && selectedDirection.schedule.flatMap(event => event.actions.map(action => new Date(action.start).toLocaleDateString()));

    const times = date && selectedDirection && selectedDirection.schedule
      .flatMap(event => event.actions.map(action => new Date(action.start)))
      .filter(time => new Date(date) < time && new Date(date + 1000 * 60 * 60 * 24) >= time);

    if (times && times.length) {
      const stateTime = this.state.order.time
      if (!stateTime || (this.state.order && !times.find(item => (item.valueOf() === stateTime.valueOf())))) {
        setTimeout(() => this.handleTime(times[0]), 1) // TODO: move to componentDidMount or constructor
      }
    }
    const ticketGroup = selectedDirection && selectedDirection.tickets && selectedDirection.tickets.reduce(function (r, a) {
      r[a.category.name.current] = r[a.category.name.current] || [];
      r[a.category.name.current].push(a);
      return r;
    }, Object.create(null));

    return (
      <div className={cnService()}>
        {title && <h3 className={cnService("Title")}>{title[ lang as any ].name}</h3>}
        {dates && <Calendar dates={dates} onChange={this.handleDate} />}
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
                        const exist = this.state.tickets.find(item => (item._key === ticket._key))
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
  const order = state.order.orders.find(item => (item.id === props.id)) || null
  return {
    order,
    sessionId: state.session.sessionId
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  serviceUpdate: (payload: IServiceState, sessionId: string | null) => updateService(dispatch, payload, sessionId),
});

export const Service = connect(mapStateToProps, mapDispatchToProps)(ServiceClass)