import * as React from "react";
import { cn } from "@bem-react/classname";
import { IServiceProps, IServiceState } from './index';

import { Calendar } from "../Calendar/Calendar";

import "./Service.css";

import serviceFixtures from './service.json';

const cnService = cn('Service');

export class Service extends React.PureComponent<IServiceProps, IServiceState> {
  constructor(props: IServiceProps){
    super(props)

    this.state = Object.assign({}, props);

    this.handleOpenDate = this.handleOpenDate.bind(this);
    this.handleOpenTime = this.handleOpenTime.bind(this);
  }

  handleOpenDate() {
    this.setState({ isOpenDate: !this.state.isOpenDate });
  }

  handleOpenTime() {
    this.setState({ isOpenTime: !this.state.isOpenTime });
  }

  getService() {
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        if (serviceFixtures.hasOwnProperty(this.props.id)) {
          resolve((serviceFixtures as any)[this.props.id]);
        }
      }, 100);
    } );
  }

  componentDidMount() {
    this.getService().then( data => {
      this.setState(data);
    } );
  }

  render() {
    const {
      id
    } = this.props

    const {
      title,
      dates,
      periods,
      isOpenDate,
      isOpenTime
    } = this.state

    return (
      <fieldset className={cnService()}>
        {title && <h3 className={cnService("Title")}>{title}</h3>}
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
              {periods.map((period, key) => (
                <option key={key}>
                  since{" "}
                  {new Date(period.start * 1000).toLocaleDateString("ru")}{" "}
                  to {new Date(period.end * 1000).toLocaleDateString("ru")}
                </option>
              ))}
            </select>
          </div>)
          : dates && <Calendar dates={dates} />
        }
        <div className={cnService("Directions")}>
          <select>
            <option>Санкт-Петербург → Петергоф</option>
            <option>Петергоф → Санкт-Петербург</option>
            <option>Санкт-Петербург → Петергоф → Санкт-Петербург</option>
            <option>Москва → Петушки</option>
          </select>
        </div>
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
  }
}
