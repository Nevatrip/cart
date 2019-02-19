import React, { PureComponent } from "react";
import { IServiceTicketProps, IServiceTicketState } from "./index";

export class ServiceTicket extends PureComponent<IServiceTicketProps, IServiceTicketState> {
  constructor(props: IServiceTicketProps) {
    super(props);

    this.state = {
      count: 0
    }

    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  incrementCount(count: number) {
    this.setState({
      count: count++
    })
  }

  decrementCount(count: number) {
    this.setState({
      count: count--
    })
  }

  render() {
    const { ticket } = this.props;
    const { count } = this.state;

    return (
      <li>
        {ticket.ticket.map(ticketMeta => ticketMeta.title).join(' + ')}
        &nbsp;&nbsp;
        ({ticket.category.title}),
        &nbsp;&nbsp;
        {ticket.price} ₽
        &nbsp;&nbsp;
        <button disabled={this.state.count === 0} onClick={() => this.setState({ count: this.state.count > 0 ? this.state.count - 1 : 0 })}>-</button>
        &nbsp;&nbsp;
        {count}
        &nbsp;&nbsp;
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>+</button>
      </li>
    )
  }

}

