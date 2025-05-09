import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'


// Note component is called presentational component, because it is only responsible for rendering the UI
const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

Note.propTypes = {
    note: PropTypes.shape({
        content: PropTypes.string.isRequired,
        important: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired,
    handleClick: PropTypes.func.isRequired
}

// Notes component is called container component, because it is responsible for connecting the UI to the Redux store
const Notes = () => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state)

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() =>
                        dispatch(toggleImportanceOf(note.id))
                    }
                />
            )}
        </ul>
    )
}


export default Notes
