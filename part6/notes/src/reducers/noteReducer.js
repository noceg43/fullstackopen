import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'


const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    // here its possible to modify mutable state
    // why? Because Immer library is used under the hood
    reducers: {
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            // use current to get the current state in a "readable" way
            console.log(current(state))

            // also using the regular map function to get a new array works
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    },
})

export const { toggleImportanceOf, setNotes, appendNote } = noteSlice.actions

// here the async functions are defined
// they use Redux Thunk library to handle async actions
// they return a function that takes dispatch as an argument

export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const createNote = content => {
    return async dispatch => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}

export default noteSlice.reducer