import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Login } from './login/components/Login.jsx'
import 'boxicons/css/boxicons.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
)
