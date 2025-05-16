import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))


// defined here the store of the noteReducer

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)