import * as React from "react";
import { cn } from "@bem-react/classname";
import { IServiceProps, IServiceState, IDates, IDirections } from './index';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Calendar } from "../Calendar/Calendar";

import "./Service.css";

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
      service: {},
      order: {},
      tickets: {}
    }

    // this.handleOpenDate = this.handleOpenDate.bind(this);
    // this.handleOpenTime = this.handleOpenTime.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDirection = this.handleDirection.bind(this);
    this.handleTicket = this.handleTicket.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  // handleOpenDate() {
  //   this.setState({ isOpenDate: !this.state.isOpenDate });
  // }

  // handleOpenTime() {
  //   this.setState({ isOpenTime: !this.state.isOpenTime });
  // }

  handleDate(date: number) {
    this.setState({
      order: {
        ...this.state.order,
        date: date
      }
    })
  }

  handleDirection(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      order: {
        ...this.state.order,
        direction: event.target.value
      }
    })
  }

  handleTime(time: Date) {
    this.setState({
      order: {
        ...this.state.order,
        time: time
      }
    }, () => console.log( this.state ) )
  }

  handleTicket(ticket: any) {
    const tickets: any = Object.assign({}, this.state.tickets, {[ticket._key]: ticket})
    this.setState({tickets})
  }

  componentDidUpdate () {
    this.props.serviceUpdate(this.state)
  }

  getService() {
    // return client.getDocument(this.props.id).then((response: any) => {
    //   return response;
    // });

    const query = `*[_id == "${this.props.id}"] {title, "directions": directions[]{..., "tickets": tickets[]{..., "category": category->, "ticket": ticket[]->}}}[0]`;
    const params = {}

    return client.fetch(query, params).then((response: any) => {
      return response;
    });
  }

  componentDidMount() {
    this.getService().then( (response: any) => {
      const newState = { ...this.state };
      newState.service = response;
      newState.order.direction = response.directions[0]._key;
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
                        name={(date && date.toString()) || ''}
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
                      ticketGroup[ category ].map((ticket: any) => <ServiceTicket ticket={ticket} key={ticket._key} handleTicket={this.handleTicket}/> )
                    }
                  </ul>
                </li>
              ) )
            }


          </ul>
        </div>
      </div>
    )

    /*
    const dateFormat: string = date ? new Date(date).toLocaleDateString("ru") : '';
    const directions: IDirections = dates && dateFormat && dates[dateFormat].directions || {};
    const directionData = directions && direction && directions[direction];

    return (
      <fieldset className={cnService()}>
        {dates && periods && (
          <div className={cnService("DateType")}>
            <label>
              <input
                type="checkbox"
                name="dateTime"
                onChange={this.handleOpenDate}
                defaultChecked={isOpenDate}
              />
              Открытая дата
            </label>
          </div>
        )}
        {
          isOpenDate
          ? periods && (<div className={cnService("Period")}>
              <select>
                {Object.values(periods).map((period, key) => (
                  <option key={key}>
                    since{" "}
                    {new Date(period.start * 1000).toLocaleDateString("ru")}{" "}
                    to {new Date(period.end * 1000).toLocaleDateString("ru")}
                  </option>
                ))}
              </select>
            </div>)
          : dates && <Calendar dates={dates} onChange={this.handleDate} />
        }

        <div className={cnService("Direction")}>
          <div className={cnService("PointAndPlace")}>
            <div className={cnService("Point")}>
              <select>
                <option>Дворцовая пристань</option>
              </select>
            </div>
            <div className={cnService("Place")}>
              <select>
                <option>Трансатлантический пароход «Титаник»</option>
              </select>
            </div>
          </div>
          <div className={cnService("TimeAndType")}>
            <div className={cnService("TimeType")}>
              <label>
                <input
                  type="checkbox"
                  name="TimeType"
                  onChange={this.handleOpenTime}
                  defaultChecked={isOpenTime}
                />
                Открытое время
              </label>
            </div>
            {
              isOpenTime
              ? (<div className={cnService("Time", { type: "open" })}>
                <p>
                  Текстовое описание расписания: каждые 2 часа с 12 до 18:
                </p>
                <ul>
                  <li>12</li>
                  <li>14</li>
                  <li>16</li>
                  <li>18</li>
                </ul>
              </div>)
              : (<fieldset className={cnService("Time", { type: "fixed" })}>
                <ul className={cnService("Times")}>
                  {
                    [12,14,16,18].map( (hour, key) => (
                      <li className={cnService("TimeItem")} key={key}>
                        <label className={cnService("TimeItemInner")}>
                          <input
                            defaultChecked={key===0}
                            type="radio"
                            name={'time-' + id}
                            // onChange={this.handleOpenDate}
                          />
                          {hour}:00
                          <br />
                          Сенатская пристань
                          <br />
                          «Титаник»
                        </label>
                      </li>
                    ) )
                  }
                </ul>
              </fieldset>)
            }
          </div>
        </div>
      </fieldset>
    );
    */
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({})

const mapDispatchToProps = (dispatch: any) => ({
  serviceUpdate: (payload: any) => dispatch({
    type: "SERVICE_UPDATE",
    payload
  }),
});

export const Service = connect(mapStateToProps, mapDispatchToProps)(ServiceClass)