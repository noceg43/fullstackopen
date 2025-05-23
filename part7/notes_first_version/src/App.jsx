import React from 'react'
import {
    // Rename BrowserRouter to Router 
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'

import Notes from './components/Notes'

const App = () => {

    const padding = {
        padding: 5
    }

    return (
        <Router>
            <div>
                {
                    // Rendered links used to navigate between different routes
                    // They also updates the URL in the address bar
                }
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/notes">notes</Link>
                <Link style={padding} to="/users">users</Link>
            </div>

            {
                // rendered content that changes based on the URL
            }
            <Routes>
                {
                    // Component that is rendered when the URL matches the path
                }
                <Route path="/notes" element={<Notes />} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/" element={<h1>Home</h1>} />
            </Routes>

            <div>
                <i>Note app, Department of Computer Science 2024</i>
            </div>
        </Router>
    )
}

export default App