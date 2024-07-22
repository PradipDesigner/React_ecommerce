import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import'bootstrap/dist/js/bootstrap.bundle.js'
import {Provider} from 'react-redux'
import AppStore from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={AppStore}>
    <App />
    </Provider>
  </React.StrictMode>,
)
