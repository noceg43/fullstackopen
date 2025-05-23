import ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'
import './index.css'
import {
    BrowserRouter as Router,
} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
    // define the router here because we need to use "useMatch" in the App component
    <Router>
        <App />
    </Router>
)