const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://noceg:${password}@cluster0.pcejh.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`



mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({

  // constraints for the content field
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'CSS is hard',
  important: false,
})


/*
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})