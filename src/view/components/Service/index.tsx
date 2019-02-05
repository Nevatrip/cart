import { IClassNameProps } from "@bem-react/core";

interface IPeriod {
  eventId: string;
  start: number;
  end: number;
}

export interface IServiceProps extends IClassNameProps {
  id?: string;
  title?: string;
  periods?: IPeriod[];
  dates?: string[];
}
