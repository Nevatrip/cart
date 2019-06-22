// Core
import React from 'react';
import { render } from 'react-dom';

// Instruments
import './theme/init.css';
// App
import App from './App';

render(
    <App sessionId = 'test-test-test' />,
    document.getElementById('app')
);
