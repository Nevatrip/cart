// Core
import React, { useState } from 'react';

const Counter = (props) => {
  const initialState = {
    count: 0,
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

  const _increment = () => {
    const count = state.count + 1;

    _counterPrice(count);

    return (
      _setState({ count })

    );
  };
  const _decrement = () => {
    if (state.count === 0) {
      return null;
    }
    const count = state.count - 1;

    _counterPrice(count);

    return (
      _setState({ count })

    );
  };
  const _setCount = (event) => {
    const count = event.target.value;

    _counterPrice(count);

    return _setState({ count });
  };

  return (
    <>
      <button onClick = { _decrement }>-</button>
      <input min = { 0 } value = { state.count } onChange = { _setCount } />
      <button onClick = { _increment }>+</button>
    </>
  );
};

export default Counter;
