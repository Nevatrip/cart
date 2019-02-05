import * as React from "react";
import { cn } from "@bem-react/classname";
import { IServiceProps } from './index';

// import "./Service.css";

const cnService = cn('Service');

export const Service: React.FunctionComponent<IServiceProps> = ({
  className,
  id,
  title,
  dates,
  periods
}) => (
  <div className={cnService()}>
    {title && <div className={cnService("Title")}>{title}</div>}
    {dates && periods && (
      <div className={cnService("DateType")}>
      <label>
        <input type="checkbox" name="dateTime" />
        Открытая дата
      </label>
      </div>
    )}
    <select>
      {dates && dates.map(date => (
        <option>{date}</option>
      ))}
    </select>
  </div>
);
