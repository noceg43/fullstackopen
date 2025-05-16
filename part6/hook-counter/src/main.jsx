import ReactDOM from 'react-dom/client'
import App from './App'

import { CounterContextProvider } from './CounterContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    // just like Flutter Provider, but for React
    // this is a context provider, which allows us to pass data down the component tree
    <CounterContextProvider>
        <App />
    </CounterContextProvider>
)