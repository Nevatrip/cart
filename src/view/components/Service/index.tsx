import { IClassNameProps } from "@bem-react/core";

interface IPeriod {
  eventId: string;
  start: number;
  end: number;
}

export interface IServiceProps extends IClassNameProps {
  id: string;
  title?: string;
  periods?: IPeriod[];
  dates?: string[];
}

export interface IServiceState {
  title?: string;
  periods?: IPeriod[];
  period?: string;
  dates?: string[];
  isOpenDate?: boolean;
  date?: number; // epoch
  direction?: string;
  point?: string;
  isOpenTime?: boolean;
  time?: number; // epoch
  place?: string;
  places?: string[];
}

export interface IServiceData {

}
