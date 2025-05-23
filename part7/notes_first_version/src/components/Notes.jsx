import React, { useState, useEffect } from 'react'
import noteService from '../services/notes'
import Note from './Note'
import Notification from './Notification'

const Notes = () => {

    const [showAll, setShowAll] = useState(true)
    const [notes, setNotes] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)


    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(() => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }



    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])


    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)


    return <><div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
        </button>
    </div><ul>
            {notesToShow.map(note => <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)} />
            )}
        </ul></>
}

export default Notes