import React, { PureComponent } from "react";
import { IServiceTicketProps, IServiceTicketState } from "./index";

export class ServiceTicket extends PureComponent<IServiceTicketProps, IServiceTicketState> {
  constructor(props: IServiceTicketProps) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue (count: number) {
    this.props.handleTicket(Object.assign({}, {...this.props.ticket, ticket: this.props.ticket.ticket[0]}, {count}))
  }

  render() {
    const { ticket, count } = this.props;

    return (
      <li>
        {ticket.ticket.map(ticketMeta => ticketMeta.title).join(' + ')}
        &nbsp;&nbsp;
        ({ticket.category.title}),
        &nbsp;&nbsp;
        {ticket.price} ₽
        &nbsp;&nbsp;
        <button disabled={count === 0} onClick={() => this.updateValue(count > 0 ? count - 1 : 0)}>-</button>
        &nbsp;&nbsp;
        {count}
        &nbsp;&nbsp;
        <button onClick={() => this.updateValue(count + 1)}>+</button>
      </li>
    )
  }

}

