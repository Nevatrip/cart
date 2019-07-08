// Core
import React from 'react';
import { render } from 'react-dom';

// Instruments
import './theme/init.css';
// App
import App from './App';

const sessionId = new URL(window.location.href).searchParams.get('session') || 'test-test-test';

render(
  <App sessionId = { sessionId } />,
  document.getElementById('app')
);
