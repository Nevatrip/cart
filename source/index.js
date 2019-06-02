// Core
import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// Config
import { sessionId, productId } from '../configNevaTrip';

// App
import App from './App';

render(
    <App productId = { productId } sessionId = { sessionId } />,
    document.getElementById('app')
);
