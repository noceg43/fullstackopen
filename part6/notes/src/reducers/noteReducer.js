import { createSlice, current } from '@reduxjs/toolkit'

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
]

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    // here its possible to modify mutable state
    // why? Because Immer library is used under the hood
    reducers: {
        createNote(state, action) {
            const content = action.payload
            // so it's possible to use push on an array and get the new state
            state.push({
                content,
                important: false,
                id: generateId(),
            })
        },
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
        }
    },
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer