const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    // use the .note css theme
    <li className="note">
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note