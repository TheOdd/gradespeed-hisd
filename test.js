import test from 'ava';
var gradespeed = require('./index');

test.cb('Invalid username & pass', t => {
  t.plan(2);
  gradespeed('INVALIDUSERNAME', 'INVALIDPASSWORD', (err, body) => {
    t.is(body, null);
    t.is(err.message, 'Invalid username or password.');
    t.end();
  });
});
