const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

var port = config.PORT

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})


const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)