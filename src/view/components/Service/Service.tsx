import * as React from "react";
import { cn } from "@bem-react/classname";
import { IServiceProps, IServiceState } from './index';

import { Calendar } from "../Calendar/Calendar";

// import "./Service.css";

const cnService = cn('Service');

export class Service extends React.PureComponent<IServiceProps, IServiceState> {
  constructor(props: IServiceProps){
    super(props)

    this.state = props;

    this.handleOpenDate = this.handleOpenDate.bind(this);
    this.handleOpenTime = this.handleOpenTime.bind(this);
  }

  handleOpenDate() {
    this.setState({ isOpenDate: !this.state.isOpenDate });
  }

  handleOpenTime() {
    this.setState({ isOpenTime: !this.state.isOpenTime });
  }

  render() {
    const {
      title,
      dates,
      periods,
      isOpenDate,
      direction,
      point,
      place,
      isOpenTime
    } = this.state

    return (
      <div className={cnService()}>
        {title && <div className={cnService("Title")}>{title}</div>}
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
        {!isOpenDate && dates && <Calendar dates={dates} />}
        {isOpenDate && periods && (
          <div className={cnService("Period")}>
            <select>
              {periods.map((period, key) => (
                <option key={key}>
                  since{" "}
                  {new Date(period.start * 1000).toLocaleDateString("ru")}{" "}
                  to {new Date(period.end * 1000).toLocaleDateString("ru")}
                </option>
              ))}
            </select>
          </div>
        )}
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
            {isOpenTime ? (
              <div className={cnService("Time", { type: "open" })}>
                <p>
                  Текстовое описание расписания: каждые 2 часа с 12 до 18:
                </p>
                <ul>
                  <li>12</li>
                  <li>14</li>
                  <li>16</li>
                  <li>18</li>
                </ul>
              </div>
            ) : (
              <div className={cnService("Time", { type: "fixed" })}>
                <div className={cnService("RadioGroup")}>
                  <label>
                    <input
                      type="radio"
                      name="time"
                      // onChange={this.handleOpenDate}
                      // defaultChecked={isOpenDate}
                    />
                    18:00
                    <br />
                    Сенатская пристань
                    <br />
                    «Титаник»
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
