// Core
import React, { useState } from 'react';

const Counter = () => {
    const initialState = {
        count: 0,
    };
    const [state, _setState] = useState(initialState);
    const _increment = () => _setState({ count: state.count + 1 });
    const _decrement = () => {
        return state.count === 0 ? null : _setState({ count: state.count - 1 });
    };

    return (
        <>

            <div>Количество билетов: {state.count}</div>
            <button onClick = { _increment } >+</button>
            <button onClick = { _decrement }>-</button>
        </>
    );
};

export default Counter;
