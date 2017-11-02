import test from 'ava';
var gradespeed = require('./index');

const username = process.env.GS_USERNAME;
const password = process.env.GS_PASSWORD;

test.cb('Invalid username & pass', t => {
  t.plan(2);
  gradespeed('INVALIDUSERNAME', 'INVALIDPASSWORD', (err, body) => {
    t.is(body, null);
    t.is(err.message, 'Invalid username or password.');
    t.end();
  });
});

test.cb('Return body of gradebook page.', t => {
  t.plan(2);
  gradespeed(username, password, (err, body) => {
    var isString = typeof body === 'string';
    t.falsy(err);
    t.truthy(isString && body);
    t.end();
  });
});
