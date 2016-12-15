const express = require('express')
const app = express()
const path = require('path')
const port = (process.env.PORT || 3000)

app.use(express.static('public'))
app.use('/user', express.static('public'))
app.use('/item', express.static('public'))
app.use('/comment', express.static('public'))
app.use('/stories', express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/ask', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/jobs', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/topstories', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/show', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/item/:id', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/stories/:id', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/user/:id', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/comments/:id', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(port)
console.log('booted on port ' + port)
