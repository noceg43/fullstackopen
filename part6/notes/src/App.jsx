import React from 'react'
import { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
    const dispatch = useDispatch()

    // on app startup, initialize the notes
    useEffect(() => {
        dispatch(initializeNotes())
    }, [])

    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
        </div>
    )
}

export default App