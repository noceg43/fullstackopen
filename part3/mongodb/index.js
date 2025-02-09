// do not use ES module it's not suggested in this course
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')


const app = express()
app.use(cors())


// on the dist folder, we have the frontend
// when the server receives a GET request this middleware is used
app.use(express.static('dist'))


// activate json parser
// it's a middleware that parses incoming requests with JSON payloads
app.use(express.json())


// another middleware used to log
const requestLogger = (request, response, next) => {
  // execute this before moving to the next middleware
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  // move to the next middleware
  next()
}
app.use(requestLogger)
// the middlewares follows the order they are defined
// so let's execute all the middlewares before the routes
// execute the routes
// and then execute the middleware for unknown routes


// routes
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {

      if (note) {
        response.json(note)
      } else {
        // 404 Not Found, since the note doesn't exist
        response.status(404).end()
      }
    })
    // Pass to the middleware error handler
    .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  // it now throws a validation error if the content does not meet the requirements
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})


// Catch-all middleware for non-existent routes (404)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // throwed if the error is a validation error (for the GET request with an invalid id)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    // throwed if the error is a validation error (for the POST request with an invalid content)
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

//
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



