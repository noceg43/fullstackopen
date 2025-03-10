const mongoose = require('mongoose')
require('dotenv').config()

if (!process.env.MONGODB_PASSWORD) {
  console.log('MONGODB_PASSWORD not set in .env file')
  process.exit(1)
}

const password = process.env.MONGODB_PASSWORD

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
/*
const note = new Note({
  content: 'CSS is hard',
  important: false,
})



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