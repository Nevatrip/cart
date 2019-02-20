import * as React from "react";
import { cn } from "@bem-react/classname";
import { connect } from 'react-redux';
import { IOrder } from "../index";

import './Order-Aside.css';
const cnOrder = cn('Order');

const OrderAsideClass: React.FunctionComponent<{order: IOrder[]}> = ({order}) => (
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
                                <dt>{ticket.count} {ticket.type}</dt>
                                <dd>{ticket.price}</dd>
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
      <blockquote>Sum, promocode, submit</blockquote>
      <button>Оплатить</button>
    </form>
  </div>
)

const mapStateToProps = (state: any, ownProps: any) => {
  console.log(state.order.order)
  return {
  order: state.order.orders
}}

export const OrderAside = connect(mapStateToProps)(OrderAsideClass)