import test from 'ava'
import gradespeed from './index'

const username = process.env.GS_USERNAME
const password = process.env.GS_PASSWORD

test('Invalid username & pass', t => {
  t.plan(1)

  return gradespeed('INVALIDUSERNAME', 'INVALIDPASSWORD')
  .then(t.log)
  .catch(err => t.is(err.message, 'Invalid username or password.'))
})

test('Get back valid array of return objects.', t => {
  t.plan(1)

  return gradespeed(username, password)
  .then(returnArr => {
    let isArr = Array.isArray(returnArr)
    t.truthy(isArr && returnArr)
  })
  .catch(t.log)
})
