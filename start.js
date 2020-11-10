const mongoose = require('mongoose')
// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' })

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

// import all of our models
require('./models/Store')
require('./models/User')
require('./models/Template')

// Start our app!
const app = require('./app')
app.set('port', process.env.PORT || 3000)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT localhost:${server.address().port}`)
})
