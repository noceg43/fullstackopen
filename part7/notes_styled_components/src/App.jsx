import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Input,
    Button,
    Page,
    Navigation,
    Footer
} from './style'

import {
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch,
} from "react-router-dom"


const Home = () => (
    <div>
        <h2>TKTL notes app</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
)

const Note = ({ note }) => {
    if (!note) {
        return <div>Note not found</div>
    }
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

Note.propTypes = {
    note: PropTypes.object
}


const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

Notes.propTypes = {
    notes: PropTypes.array.isRequired
}

const Users = () => (
    <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
)

const Login = (props) => {
    // useNavigate is used to navigate to a different page
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username:  <Input />
                </div>
                <div>
                    password: <Input type='password' />
                </div>
                <Button type="submit">login</Button>
            </form>
        </div>
    )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired
}

const App = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])

    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const padding = {
        padding: 5
    }

    // useMatch is used to match the current URL with the given pattern
    const match = useMatch('/notes/:id')
    const note = match
        ? notes.find(note => note.id === Number(match.params.id))
        : null

    return (
        <Page>
            <div>
                <Navigation>
                    <Link style={padding} to="/">home</Link>
                    <Link style={padding} to="/notes">notes</Link>
                    <Link style={padding} to="/users">users</Link>
                    {user
                        ? <em>{user} logged in</em>
                        : <Link style={padding} to="/login">login</Link>
                    }
                </Navigation>

                <Routes>
                    <Route path="/notes/:id" element={<Note note={note} />} />
                    <Route path="/notes" element={<Notes notes={notes} />} />
                    {
                        // Navigate, used to redirect the user to the login page if they are not logged in
                    }
                    <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer>
                    <br />
                    <em>Note app, Department of Computer Science 2023</em>
                </Footer>
            </div>
        </Page>
    )
}

export default App