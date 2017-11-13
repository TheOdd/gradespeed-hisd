'use strict'

const fetchRaw = require('./lib/fetchRaw')
const parseRaw = require('./lib/parseRaw')

const gradespeed_hisd = (username, password) => (
  new Promise((resolve, reject) => {
    fetchRaw(username, password)
    .then(bodyArr => resolve(parseRaw(bodyArr)))
    .catch(reject)
  })
)

module.exports = gradespeed_hisd
