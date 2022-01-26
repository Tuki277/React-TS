import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Notification from './components/Notification'
import './index.css'

import Routes from './routes'
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
