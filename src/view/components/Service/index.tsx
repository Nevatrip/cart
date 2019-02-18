import { IClassNameProps } from "@bem-react/core";

interface Slug {
  _type: 'slug';
  current: string;
}

interface KeySlug {
  key: Slug;
  name: string;
}

interface localeTitleSlug {
  // _type?: 'localeTitleSlug';
  [key: string]: KeySlug;
}

interface IPeriod {
  eventId: string;
  start: number;
  end: number;
}

export interface IServiceProps extends IClassNameProps {
  id: string;
  title?: localeTitleSlug;
  periods?: IPeriod[];
  dates?: string[];
}

export interface ISchedule {
  start: number;
  end: number;
  isAllDay?: boolean;
  point: string;
  place: string;
}

export interface IDirection {
  title: string;
  schedule: ISchedule[];
}

export interface IDirections {
  [key: string]: IDirection;
}

export interface IDate {
  directions: IDirections;
}

export interface IDates {
  [key: string]: IDate;
}

interface action {
  _key: string;
  _eventId: string;
  start: string;
}

interface event {
  start: string;
  actions: action[];
}

export interface ticket {
  _key: string;
  price: number;
  category: {
    title: string;
    name: {
      current: string;
    }
  },
  ticket: {
    title: string
  }[]
}

interface direction {
  _key: string;
  _type: 'direction';
  title: string;
  tickets: ticket[];
  schedule: event[];
}

interface service {
  title?: localeTitleSlug;
  directions?: direction[];
  periods?: IPeriod[];
  dates?: IDates;
  places?: string[];
}

interface order {
  isOpenDate?: boolean;
  isOpenTime?: boolean;
  period?: string;
  date?: number; // epoch
  direction?: string;
  point?: string;
  place?: string;
  time?: Date; // epoch
}

export interface IServiceState {
  service: service;
  order: order;
}
