'use strict';

var FormData = require('form-data');
var got = require('got');
var cheerio = require('cheerio');

const baseURL = 'https://apps.houstonisd.org/ParentStudentConnect';
var cookie = null;
var bodyArr = [];
var cnt = 0;

/**
* Fetches gradebook page raw html
* @param {string} username
* @param {string} password
* @callback callback
*/
module.exports = function(username, password, callback) {
  got(baseURL + '/', {
    followRedirect: false
  })
  .then(response => {
    if (response.statusCode == 200) {
      cookie = response.headers['set-cookie'][0].split(' ')[0];
      let $ = cheerio.load(response.body);
      var form = new FormData();
      form.append('ctl00$ContentArea$txtUserName', username);
      form.append('ctl00$ContentArea$txtPassword', password);
      form.append('ctl00$ContentArea$btnLogin', 'Login');
      form.append('__EVENTTARGET', '');
      form.append('__EVENTARGUMENT', '');
      form.append('__VIEWSTATE', $('#__VIEWSTATE').attr('value'));
      form.append('__VIEWSTATEGENERATOR', $('#__VIEWSTATEGENERATOR').attr('value'));
      form.append('__PREVIOUSPAGE', $('#__PREVIOUSPAGE').attr('value'));
      form.append('__EVENTVALIDATION', $('#__EVENTVALIDATION').attr('value'));
      return got.post(baseURL + '/login.aspx', {
        body: form,
        headers: {
          cookie: cookie
        }
      })
    }
  })
  .then(response => {
    return callback(new Error('Invalid username or password.'), null);
  })
  .catch(error => {
    if (error.url === 'https://apps.houstonisd.org/ParentStudentConnect/login.aspx' && error.statusCode === 302) {
      cookie += ' ' + error.headers['set-cookie'][0].split(' ')[0];
      got(baseURL + '/PSCHome.aspx', {
        headers: {
          cookie: cookie
        }
      })
      .then(response => {
        return got(baseURL + '/GradeSpeed.aspx', {
          followRedirect: false,
          headers: {
            cookie: cookie
          }
        })
      })
      .then(response => {
        let $ = cheerio.load(response.body);
        return got($('#ctl00_ContentArea_frame_GS').attr('src'), {
          followRedirect: false
        })
      })
      .then(response => {
        cookie = response.headers['set-cookie'][0].split(' ')[0] + ' PcLogin=Type=Student; PCLanguage=Code=en';
        return got('https://parent.gradebook.houstonisd.org/pc/ParentStudentGrades.aspx', {
          headers: {
            cookie: cookie
          }
        })
      })
      .then(response => {
        bodyArr.push(['', response.body]);
        let $ = cheerio.load(response.body);
        var gradeArr = $('a.Grade').filter(function() {
          return $(this).text()[0] !== '(';
        });
        var gradeLinkArr = [];
        gradeArr.each(function() {
          gradeLinkArr.push($(this).attr('href').substring(1));
        });
        var getBody = response => {
          cnt++;
          bodyArr.push([response.req.path.match(/(\?.+)$/)[1], response.body]);
          if (cnt === gradeLinkArr.length) {
            return callback(null, bodyArr);
          }
        }
        gradeLinkArr.forEach(link => {
          got('https://parent.gradebook.houstonisd.org/pc/ParentStudentGrades.aspx', {
            query: link,
            headers: {
              cookie: cookie
            }
          })
          .then(getBody)
          .catch(error => {
            return callback(error, null);
          })
        })
      })
      .catch(error => {
        return callback(error, null);
      })
    } else {
      return callback(error, null);
    }
  })
}
