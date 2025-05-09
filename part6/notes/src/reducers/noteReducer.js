const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            // not allowed to mutate the state directly
            /* state.push(action.payload)
            return state */

            // instead, create a new array with the old state and the new note
            return [...state, action.payload]

        case 'TOGGLE_IMPORTANCE': {
            // find the note to be updated
            const id = action.payload.id
            const noteToChange = state.find(n => n.id === id)

            // create a new note with the updated important property
            const changedNote = { ...noteToChange, important: !noteToChange.important }

            // return a new array with the updated note
            return state.map(note => note.id !== id ? note : changedNote)
        }
        default:
            return state
    }
}

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

// Action creators


export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}


export default noteReducer;