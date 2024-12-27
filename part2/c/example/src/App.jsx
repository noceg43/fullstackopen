import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // continue from https://fullstackopen.com/en/part2/getting_data_from_server#the-development-runtime-environment
  const hook = () => {
  console.log('effect')

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)

  const eventHandler = response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }
  }
  
  // the hook function is executed always after the component is rendered
  // the second paramater [] define how often the hook function is called (only one time if empty)
  useEffect(hook, [])

  console.log('render', notes.length, 'notes')

  // ...
}

export default App 
