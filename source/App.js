// Core
import React, { Component } from 'react';

//Pages
import Cart from './pages/Cart';
import Counter from './components/Counter';

export default class App extends Component {

    render () {
        const sessionId = 'test-test-test';

        return (
            <>
                <Cart sessionId = { sessionId } />
                <Counter />
            </>
        );
    }
}
