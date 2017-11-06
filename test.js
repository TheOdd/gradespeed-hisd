import test from 'ava';
var gradespeed = require('./index');

const username = process.env.GS_USERNAME;
const password = process.env.GS_PASSWORD;

test.cb('Invalid username & pass', t => {
  t.plan(2);
  gradespeed('INVALIDUSERNAME', 'INVALIDPASSWORD', (err, returnArr) => {
    t.is(returnArr, null);
    t.is(err.message, 'Invalid username or password.');
    t.end();
  });
});

test.cb('Get back valid array of return objects.', t => {
  t.plan(2);
  gradespeed(username, password, (err, returnArr) => {
    var isArr = Array.isArray(returnArr);
    t.falsy(err);
    t.truthy(isArr && returnArr);
    t.end();
  });
});
