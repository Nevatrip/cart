// Core
import React from 'react';
import { render } from 'react-dom';

import { sessionId, productId } from '../configNevaTrip';

// Instruments
import './theme/init.css';
// App
import App from './App';

render(
    <App productId = { productId } sessionId = { sessionId } />,
    document.getElementById('app')
);
