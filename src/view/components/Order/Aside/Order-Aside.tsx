import * as React from "react";
import { cn } from "@bem-react/classname";
import { connect } from 'react-redux';
import { ICompileTicket } from "../../";
import { ApplicationState } from "../../../../reducers/index"
import ButtonMUI from '@material-ui/core/Button';

import './Order-Aside.css';
const cnOrder = cn('Order');

const OrderAsideClass: React.FunctionComponent<{order: ICompileTicket[]}> = ({order}) => (
  <div className={cnOrder('Aside')}>
    <div className={cnOrder('Aside-Fixed')}>
      <div className={cnOrder('Aside-Fixed-Inner')}>
        {/*<blockquote>Sidebar</blockquote>*/}
        <div className={cnOrder('Tickets')}>
          {/*<blockquote>Ticket's preview</blockquote>*/}
          <ul className={cnOrder('Tickets-Ul')}>
            {
              order.map( orderItem => {
                return (
                  <li key={(orderItem.title || '') + (orderItem.date || '') + (orderItem.time || '')} className={cnOrder('Tickets-Li')}>
                    <h4 className={cnOrder('Tickets-Title')}>{orderItem.title}</h4>
                    <dl>
                      {orderItem.date && <div className={cnOrder('Tickets-Row')}>
                        <dt className={cnOrder('Tickets-Row-Title')}>Дата:</dt>
                        <dd className={cnOrder('Tickets-Row-Content')}>{orderItem.isOpenDate ? 'isOpenDate' : orderItem.date.toLocaleDateString()}</dd>
                      </div>}
                      {orderItem.time && <div className={cnOrder('Tickets-Row')}>
                        <dt className={cnOrder('Tickets-Row-Title')}>Время:</dt>
                        <dd className={cnOrder('Tickets-Row-Content')}>{orderItem.isOpenTime ? 'isOpenTime' : orderItem.time.toLocaleTimeString()}</dd>
                      </div>}
                      {orderItem.point && <div className={cnOrder('Tickets-Row')}>
                        <dt className={cnOrder('Tickets-Row-Title')}>Причал:</dt>
                        <dd className={cnOrder('Tickets-Row-Content')}>[{orderItem.point.title}]({orderItem.point.map})</dd>
                      </div>}
                      {orderItem.tickets && (
                        <div className={cnOrder('Tickets-Row')}>
                          <dt className={cnOrder('Tickets-Row-Title')}>Билет:</dt>
                          <dd className={cnOrder('Tickets-Row-Content')}>
                            <dl className={cnOrder('Tickets-Col-Inner')}>
                              {
                                orderItem.tickets.map(ticket => (
                                  <div key={JSON.stringify(ticket)}>
                                    <dt className={cnOrder('Tickets-Row-Inner')}>
                                      <span className={cnOrder('Tickets-Row-Inner-El')}>{ticket.count}</span>
                                      <span className={cnOrder('Tickets-Row-Inner-El')}>
                                        <span className={cnOrder('Tickets-Row-Inner-El-Sm')}>{ticket.ticket.title} </span>
                                        <i className={cnOrder('Tickets-Row-Inner-El-Xsm')}>{ticket.category.title}</i>
                                      </span>
                                      <span className={cnOrder('Tickets-Row-Inner-El')}>{ticket.price}р.</span>
                                    </dt>
                                  </div>
                                ) )
                              }
                            </dl>
                          </dd>
                        </div>
                      )}
                      <div className={cnOrder('Tickets-Row')}>
                        <dt>Стоимость</dt><dd></dd>
                      </div>
                    </dl>
                  </li>
                )
              } )
            }
          </ul>
        </div>
        <form className={cnOrder('Footer')} action="https://money.yandex.ru/eshop.xml" method="post">
          <blockquote>Итого к оплате: {order.reduce((accum, curr) => {
            return accum + (curr && curr.tickets ? curr.tickets.reduce((accum, curr) => (accum + ((curr.count ? curr.count : 0) * Number(curr.price))), 0) : 0)
          }, 0)}, promocode, submit</blockquote>
          <ButtonMUI>Оплатить</ButtonMUI>
        </form>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state: ApplicationState) => {
  console.log(state.order.orders)
  return {
  order: state.order.orders
}}

export const OrderAside = connect(mapStateToProps)(OrderAsideClass)
