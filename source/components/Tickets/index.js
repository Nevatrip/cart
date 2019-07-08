// Core
import React from 'react';
import useStoreon from 'storeon/react';

// Components
import Counter from '../Counter';
import Styles from '../Product/styles.m.css';

export const Tickets = (props) => {
  const { dispatch, totalData } = useStoreon('totalData');
  const { productKey, tickets } = props;

  const _selectedTicket = (ticket) => {
    const currentItem = totalData[productKey];

    if (ticket.count > 0) {
      currentItem.selectedTicket[ticket.ticketKey] = ticket;
    } else {
      delete currentItem.selectedTicket[ticket.ticketKey];
    }
    dispatch('totalData/updateCart', currentItem);
    dispatch('cart/update');
  };

  const _renderTickets = () => {
    return tickets.map((item) => {
      return (
        <div key = { item._key } className = 'ticketsItem' data-name = {item.name} >
          <dt className = 'ticketsItemText' >
            {item.name || '???'}, {item.price} ₽
          </dt>
          <dd className = 'ticketsItemControls' >
            <Counter
              _selectedTicket = { _selectedTicket }
              count = { item.count }
              price = { item.price }
              ticketKey = { item._key }
              typeTicket = { item.name }
            />
          </dd>
        </div>
      );
    });
  };

  return (
    <div>
      <span className =  'caption' >
        Выберите категории билетов
      </span>
      <dl>
        {_renderTickets()}
      </dl>
    </div>
  );
};
