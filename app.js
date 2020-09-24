const path = require('path')
const express = require('express')

const app = express()
const PORT = 3000

const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.use(routes)

app.listen(PORT, () => {
  console.log('App listening port ', PORT)
})
