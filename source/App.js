// Core
import React, { Component } from 'react';
import StoreContext from 'storeon/react/context';
//Pages
import { Cart } from './pages/Cart';

import { store } from './init/store';

export default class App extends Component {

  render () {
    return (
      <>
        <StoreContext.Provider value = { store }>
          <Cart sessionId = { this.props.sessionId } />
        </StoreContext.Provider>
      </>
    );
  }
}
