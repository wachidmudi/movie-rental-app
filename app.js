const path = require('path')
const express = require('express')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 4000

const routes = require('./routes')
const sessionRes = require('./middleware/session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));


app.use(session({
  secret: 'PHKGFYRVETE',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

app.use(routes)
app.use(sessionRes)

app.listen(PORT, () => {
  console.log('App listening port ', PORT)
})
