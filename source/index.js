// Core
import React from 'react';
import { render } from 'react-dom';

// Instruments
import './theme/init.css';
// App
import App from './App';

const sessionId = window.location.hash || 'test-test-test';

render(
  <App sessionId = { sessionId } />,
  document.getElementById('app')
);
