// Core
import React, { useState } from 'react';

const Counter = () => {
    const initialState = {
        count: 0,
    };
    const [state, setstate] = useState(initialState);
    

    console.log('useState', state);

    return (
        <div>test</div>
    );
};

export default Counter;