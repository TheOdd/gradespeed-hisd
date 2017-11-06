'use strict';

var request = require('request');
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
  request({
    url: baseURL + '/',
    method: 'GET',
    followRedirect: false
  }, function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      cookie = resp.headers['set-cookie'][0].split(' ')[0];
      let $ = cheerio.load(body);
      request({
        url: baseURL + '/login.aspx',
        method: 'POST',
        form: {
          ctl00$ContentArea$txtUserName: username,
          ctl00$ContentArea$txtPassword: password,
          ctl00$ContentArea$btnLogin: 'Login',
          __EVENTTARGET: '',
          __EVENTARGUMENT: '',
          __VIEWSTATE: $('#__VIEWSTATE').attr('value'),
          __VIEWSTATEGENERATOR: $('#__VIEWSTATEGENERATOR').attr('value'),
          __PREVIOUSPAGE: $('#__PREVIOUSPAGE').attr('value'),
          __EVENTVALIDATION: $('#__EVENTVALIDATION').attr('value')
        },
        headers: {
          'Cookie': cookie
        }
      }, function(err, resp, body) {
        if (!err && resp.statusCode == 302) {
          cookie += ' ' + resp.headers['set-cookie'][0].split(' ')[0];
          request({
            url: baseURL + '/PSCHome.aspx',
            method: 'GET',
            headers: {
              'Cookie': cookie
            }
          }, function(err, resp, body) {
            if (err) {
              return callback(err, null);
            }
            request({
              url: baseURL + '/GradeSpeed.aspx',
              method: 'GET',
              followRedirect: false,
              headers: {
                'Cookie': cookie
              }
            }, function(err, resp, body) {
              if (err) {
                return callback(err, null);
              }
              let $ = cheerio.load(body);
              request({
                url: $('#ctl00_ContentArea_frame_GS').attr('src'),
                method: 'GET',
                followRedirect: false
              }, function(err, resp, body) {
                if (err) {
                  return callback(err, null);
                }
                cookie = resp.headers['set-cookie'][0].split(' ')[0] + ' PcLogin=Type=Student; PCLanguage=Code=en';
                request({
                  url: 'https://parent.gradebook.houstonisd.org/pc/ParentStudentGrades.aspx',
                  method: 'GET',
                  headers: {
                    'Cookie': cookie
                  }
                }, function(err, resp, body) {
                  if (err) {
                    return callback(err, null);
                  }
                  bodyArr.push(['', body]);
                  let $ = cheerio.load(body);
                  var gradeArr = $('a.Grade').filter(function() {
                    return $(this).text()[0] !== '(';
                  });
                  var gradeLinkArr = [];
                  gradeArr.each(function() {
                    gradeLinkArr.push($(this).attr('href'));
                  });
                  gradeLinkArr = gradeLinkArr.map(function(link) {
                    return 'https://parent.gradebook.houstonisd.org/pc/ParentStudentGrades.aspx' + link;
                  });
                  function getBody(err, resp, body) {
                    cnt++;
                    if (err) {
                      return callback(err, null);
                    } else {
                      bodyArr.push([resp.request.uri.search, body]);
                    }
                    if (cnt === gradeLinkArr.length) {
                      return callback(null, bodyArr);
                    }
                  }
                  gradeLinkArr.forEach(function(link) {
                    request({
                      url: link,
                      method: 'GET',
                      headers: {
                        'Cookie': cookie
                      }
                    }, getBody);
                  })
                })
              })
            })
          })
        } else {
          return callback(new Error('Invalid username or password.'), null);
        }
      })
    } else {
      return callback(err, null);
    }
  });
}
