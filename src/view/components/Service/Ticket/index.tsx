export interface ITicket {
  _key: string;
  price: number;
  category: {
    title: string
  },
  ticket: {
    title: string
  }[]
}

export interface IServiceTicketProps {
  ticket: ITicket
}

export interface IServiceTicketState {
  count: number;
}
