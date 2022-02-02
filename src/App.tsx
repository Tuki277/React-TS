import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import Routes from './routes'
import Header from './components/Header';

function App() {

    const checkLoginRoute = () => {
        if (localStorage.getItem("LoginStatus")) {
            return (
                <BrowserRouter>
                    <Header />
                    <Routes />
                </BrowserRouter>
            )
        }
        else {
            return (
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            )
        }
    }

    return (
        checkLoginRoute()
    );
}

export default App;
