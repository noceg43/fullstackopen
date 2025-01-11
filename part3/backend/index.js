// do not use ES module it's not suggested in this course
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())


// activate json parser
// it's a middleware that parses incoming requests with JSON payloads
app.use(express.json())

// on the dist folder, we have the frontend
// when the server receives a GET request this middleware is used
app.use(express.static('dist'))

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

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// routes

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    // return 404 if note is not found
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    // if content is missing, return 400
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        // like the expression "??"
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})


// Catch-all middleware for non-existent routes (404)
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
  };
  app.use(unknownEndpoint);


// 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



