const express = require('express')
const cors = require('cors')

const transactions = require('./transactions')
const users = require('./users')
const tiers = require('./tiers')
const getRewardsByUser = require('./features/rewards/service')

const app = express()

app.use(cors())

app.get('/rewards', (req, res) => {
  setTimeout(() => {
    const data = getRewardsByUser(transactions, users, tiers)
    res.send(data)
  }, 2000)
})

app.get('/kill', (req, res) => {
  server.close(() => {
    console.log('Server stopped')
    res.send('Server stopping')
  })
})

const server = app.listen(3001, () => {
  console.log('Server listening on port 3001')
})
