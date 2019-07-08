// Core
import React, { useState } from 'react';

const Counter = (props) => {
  const initialState = {
    count: props.count || 0,
  };

  const [state, _setState] = useState(initialState);

  const _set = (count) => {
    const { price, ticketKey, typeTicket, _selectedTicket } = props;

    _selectedTicket({
      sum: Number(price) * count,
      price,
      count,
      typeTicket,
      ticketKey,
    });

    return _setState({ count });
  };

  return (
    <>
      <button className = 'counterBtn' disabled = { state.count <= 0 } onClick = { () => _set(state.count - 1) }>–</button>
      <input className = 'counterInput' min = { 0 } value = { state.count } onChange = { (event) => _set(event.target.value) } />
      <button className = 'counterBtn' onClick = { () => _set(state.count + 1) }>+</button>
    </>
  );
};

export default Counter;
