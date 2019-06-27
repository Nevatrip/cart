// Core
import React, { Component } from 'react';
import StoreContext from 'storeon/react/context';
//Pages
import { Cart } from './pages/Cart';

// Component
import Catcher from './components/Catcher';

import { store } from './init/store';

export default class App extends Component {

  render () {
    return (
      <>
        <Catcher>
          <StoreContext.Provider value = { store }>
            <Cart sessionId = { this.props.sessionId } />
          </StoreContext.Provider>
        </Catcher>

      </>
    );
  }
}
