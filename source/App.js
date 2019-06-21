// Core
import React, { Component } from 'react';
import StoreContext from 'storeon/react/context';
//Pages
import Cart from './pages/Cart';
import Counter from './Counter';

import { store } from './init/store';

export default class App extends Component {

    render () {
        const sessionId = 'test-test-test';

        return (
            <>
                <StoreContext.Provider value = { store }>
                    {/* <Counter /> */}
                    <Cart sessionId = { sessionId } />
                </StoreContext.Provider>
            </>
        );
    }
}
