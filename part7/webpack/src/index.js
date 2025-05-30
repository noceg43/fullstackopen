import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// import needed to support async/await and other ES6+ features in older browsers
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)