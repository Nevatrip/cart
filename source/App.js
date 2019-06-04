// Core
import React, { Component } from 'react';

//Pages
import Cart from './pages/Cart';



export default class App extends Component {

    render () {
        const sessionId = 'test-test-test';

        return (
            <>
                <Cart sessionId = { sessionId } />
            </>
        );
    }
}
