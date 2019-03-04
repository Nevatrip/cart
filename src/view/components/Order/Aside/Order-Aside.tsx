import * as React from "react";
import { cn } from "@bem-react/classname";
import { connect } from 'react-redux';
import { ICompileTicket } from "../../";
import { ApplicationState } from "../../../../reducers/index"
import { Button } from "../../Button/Button";

import './Order-Aside.css';
const cnOrder = cn('Order');

const OrderAsideClass: React.FunctionComponent<{order: ICompileTicket[]}> = ({order}) => (
  <div className={cnOrder('Aside')}>
    <blockquote>Sidebar</blockquote>
    <div className={cnOrder('Tickets')}>
      <blockquote>Ticket's preview</blockquote>
      <ul>
        {
          order.map( orderItem => {
            return (
              <li key={orderItem.title}>
                <h4>{orderItem.title}</h4>
                <dl>
                  {orderItem.date && <div><dt>Дата</dt><dd>{orderItem.isOpenDate ? 'isOpenDate' : orderItem.date.toLocaleDateString()}</dd></div>}
                  {orderItem.time && <div><dt>Время</dt><dd>{orderItem.isOpenTime ? 'isOpenTime' : orderItem.time.toLocaleTimeString()}</dd></div>}
                  {orderItem.point && <div><dt>Причал</dt><dd>[{orderItem.point.title}]({orderItem.point.map})</dd></div>}
                  {orderItem.tickets && (
                    <div>
                      <dt>Билет</dt>
                      <dd>
                        <dl>
                          {
                            orderItem.tickets.map(ticket => (
                              <div key={JSON.stringify(ticket)}>
                                <dt>{ticket.ticket.title} ({ticket.category.title}), {ticket.count}x {ticket.price}р.</dt>
                              </div>
                            ) )
                          }
                        </dl>
                      </dd>
                    </div>
                  )}
                  <div><dt>Стоимость</dt><dd></dd></div>
                </dl>
              </li>
            )
          } )
        }
      </ul>
    </div>
    <form className={cnOrder('Footer')} action="https://money.yandex.ru/eshop.xml" method="post">
      <blockquote>Sum: {order.reduce((accum, curr) => {
        return accum + (curr && curr.tickets ? curr.tickets.reduce((accum, curr) => (accum + ((curr.count ? curr.count : 0) * Number(curr.price))), 0) : 0)
      }, 0)}, promocode, submit</blockquote>
      <Button>Оплатить</Button>
    </form>
  </div>
)

const mapStateToProps = (state: ApplicationState) => {
  console.log(state.order.orders)
  return {
  order: state.order.orders
}}

export const OrderAside = connect(mapStateToProps)(OrderAsideClass)
