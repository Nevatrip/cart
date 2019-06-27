// Core
import React from 'react';
import useStoreon from 'storeon/react';

// Components
import Counter from '../Counter';

export const Tickets = (props) => {
  const { dispatch, totalData } = useStoreon('totalData');
  const { productKey, tickets } = props;

  const _selectedTicket = (ticket) => {
    const ticketKey = Object.keys(ticket)[0];
    const currentItem = totalData[productKey];
    const ticketObject = ticket[ticketKey];

    if (ticketObject.count > 0) {
      currentItem.selectTicket[ticketKey] = ticket[ticketKey];
    } else {
      delete currentItem.selectTicket[ticketKey];
    }
    dispatch('totalData/updateCart', currentItem);
  };

  const _renderTickets = () => {
    return tickets.map((item) => {
      return (
        <div key = { item._key } style = { { display: 'flex' } } >
          <dt>{item.name || '???'}, {item.price} ₽</dt>
          <dd>
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
    <dl>
      {_renderTickets()}
    </dl>
  );

};
