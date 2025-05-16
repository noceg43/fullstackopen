import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

// use redux toolkit to avoid boilerplate code
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))


// defined here the store of the noteReducer

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)