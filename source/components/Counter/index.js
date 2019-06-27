// Core
import React, { useState } from 'react';

const Counter = (props) => {
  const initialState = {
    count: props.count || 0,
  };

  const [state, _setState] = useState(initialState);

  const _counterPrice = (count) => {
    const { price, ticketKey, typeTicket, _selectedTicket } = props;
    const priceCount = Number(price) * count;
    const ticketQt = {
      [ticketKey]: {
        price:        priceCount,
        currentPrice: price,
        count,
        typeTicket,
        ticketKey,
      },
    };

    _selectedTicket(ticketQt);
  };

  const _change = (value) => {
    const count = state.count + value;

    _counterPrice(count);

    return _setState({ count });
  };

  const _setCount = (event) => {
    const count = event.target.value;

    _counterPrice(count);

    return _setState({ count });
  };

  return (
    <>
      <button disabled = { state.count <= 0 } onClick = { () => _change(-1) }>-</button>
      <input min = { 0 } value = { state.count } onChange = { _setCount } />
      <button onClick = { () => _change(1) }>+</button>
    </>
  );
};

export default Counter;
