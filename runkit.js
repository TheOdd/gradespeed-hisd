var gradespeed = require("gradespeed-hisd");

const username = 'YOUR USERNAME HERE';
const password = 'YOUR PASSWORD HERE';

gradespeed.fetchRaw(username, password, function(err, returnArr) {
    if (err) {
        console.log(err);
    } else {
        console.log(returnArr);
    }
});
