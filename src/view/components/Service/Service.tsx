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

    this.handleOpenDate = this.handleOpenDate.bind( this );
  }

  handleOpenDate() {
    this.setState({ isOpenDate: !this.state.isOpenDate });
  }

  render() {
    const {
      title,
      dates,
      periods,
      isOpenDate
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
        {isOpenDate && periods && periods.length && (
          <select>
            {periods.map((period, key) => (
              <option key={key}>
                since{" "}
                {new Date(period.start * 1000).toLocaleDateString("ru")} to{" "}
                {new Date(period.end * 1000).toLocaleDateString("ru")}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
}
