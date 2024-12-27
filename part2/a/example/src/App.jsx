import Note from './components/Note'


const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        
      {/*the elements generated by the map method, must each have a unique key value: an attribute called key.*/}
      {/*never use the index of the value as key*/}
      {notes.map(note => 
          <Note key={note.id} note={note} />
        )}      </ul>
    </div>
  )
}

export default App