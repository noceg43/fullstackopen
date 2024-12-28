import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])

  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 

  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
  
    const eventHandler = initialData => {
      console.log('promise fulfilled')
      setNotes(initialData)
    }
  
    const promise = noteService.getAllThrowError()
    promise.then(eventHandler)
  
    }
    
    // the hook function is executed always after the component is rendered
    // the second paramater [] define how often the hook function is called (only one time if empty)
    useEffect(hook, [])  


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    // only for submit because default action occurs on an input change
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    noteService
    .create(noteObject)
    .then(addedNote => {
      setNotes(notes.concat(addedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    // like a "copyWith" we create a new var without changing the state
    const changedNote = { ...note, important: !note.important }
    
    // put returns the updated item from the server
    noteService.update(id, changedNote).then(updatedNote => {
      // use the map to update the state
      setNotes(notes.map(n => n.id === id ? updatedNote : n))
    })
    // catch an error
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server\n`
      )
      setNotes(notes.filter(n => n.id !== id))
    })

    

    
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow .map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit" disabled={newNote.trim().length == 0}>save</button>
      </form>   
    </div>
  )
}

export default App 