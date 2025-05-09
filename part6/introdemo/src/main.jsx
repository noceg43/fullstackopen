import React from 'react'
import ReactDOM from 'react-dom/client'
// this is deprecated, but we will use it for now since it's the simplest way to get started
import { createStore } from 'redux'


// this is a reducer:
// a function that returns a new state from initial state and action
// never call it directly, only call it from the store
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}



const store = createStore(counterReducer)

// like a listener
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
// subscribe to store changes
store.subscribe(renderApp)