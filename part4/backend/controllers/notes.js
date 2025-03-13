const Note = require('../models/note')
const User = require('../models/user')

// create the notes router
const notesRouter = require('express').Router()


notesRouter.get('/', async (request, response) => {
  // show the username and name of the user who created the note
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })

  const savedNote = await note.save()

  // save also the note id to the user's notes array
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})


notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })

  response.json(updatedNote)

})

// export the router
module.exports = notesRouter