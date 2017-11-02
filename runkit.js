var gradespeed = require("gradespeed-hisd");

const username = 'YOUR USERNAME HERE';
const password = 'YOUR PASSWORD HERE';

gradespeed(username, password, function(err, body) {
    if (err) {
        console.log(err);
    } else {
        console.log(body);
    }
});
