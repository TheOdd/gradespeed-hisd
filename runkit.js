const gradespeed = require("gradespeed-hisd")

const username = 'YOUR USERNAME HERE'
const password = 'YOUR PASSWORD HERE'

gradespeed(username, password)
.then(returnArr => {
  console.log(JSON.stringify(returnArr, null, 2))
})
.catch(error => {
  console.log(error)
})
