'use strict'

const FormData = require('form-data')
const got = require('got')
const cheerio = require('cheerio')

const baseURL = 'https://apps.houstonisd.org/ParentStudentConnect'
const bodyArr = []
let cookie = null
let cnt = 0

/**
* Fetches gradebook page raw html. Returns promise
* @param {string} username
* @param {string} password
* @return {Promise}
*/

const fetchRaw = (username, password) => (
  new Promise((resolve, reject) => {
    return got(baseURL + '/', {
      followRedirect: false
    })
    .then(response => {
      if (response.statusCode == 200) {
        cookie = response.headers['set-cookie'][0].split(' ')[0]
        const $ = cheerio.load(response.body)
        const form = new FormData()
        form.append('ctl00$ContentArea$txtUserName', username)
        form.append('ctl00$ContentArea$txtPassword', password)
        form.append('ctl00$ContentArea$btnLogin', 'Login')
        form.append('__EVENTTARGET', '')
        form.append('__EVENTARGUMENT', '')
        form.append('__VIEWSTATE', $('#__VIEWSTATE').attr('value'))
        form.append('__VIEWSTATEGENERATOR', $('#__VIEWSTATEGENERATOR').attr('value'))
        form.append('__PREVIOUSPAGE', $('#__PREVIOUSPAGE').attr('value'))
        form.append('__EVENTVALIDATION', $('#__EVENTVALIDATION').attr('value'))
        return got.post(baseURL + '/login.aspx', {
          body: form,
          headers: {
            cookie: cookie
          }
        })
      }
    })
    .then(_ => reject(new Error('Invalid username or password.')))
    .catch(response => {
      if (response.url === 'https://apps.houstonisd.org/ParentStudentConnect/login.aspx' && response.statusCode === 302) {
        cookie += ' ' + response.headers['set-cookie'][0].split(' ')[0]
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
          const $ = cheerio.load(response.body)
          const urlSrc = $('#ctl00_ContentArea_frame_GS').attr('src')
          if (urlSrc !== undefined)
            return got(urlSrc, { followRedirect: false })
          else
            reject(new Error('Server failed to respond with page HTML.')) // Error mentioned in issue #2
        })
        .then(response => {
          cookie = response.headers['set-cookie'][0].split(' ')[0] + ' PcLogin=Type=Student; PCLanguage=Code=en'
          return got('https://parent.gradebook.houstonisd.org/pc/ParentStudentGrades.aspx', {
            headers: {
              cookie: cookie
            }
          })
        })
        .then(response => {
          bodyArr.push(['', response.body])
          const $ = cheerio.load(response.body)
          const gradeArr = $('a.Grade').filter(function() {
            return $(this).text()[0] !== '('
          })
          const gradeLinkArr = []
          gradeArr.each(function() { gradeLinkArr.push($(this).attr('href').substring(1)) })
          const getBody = response => {
            cnt++
            bodyArr.push([response.req.path.match(/(\?.+)$/)[1], response.body])
            if (cnt === gradeLinkArr.length) resolve(bodyArr)
          }
          gradeLinkArr.forEach(link => {
            got('https://parent.gradebook.houstonisd.org/pc/ParentStudentGrades.aspx', {
              query: link,
              headers: {
                cookie: cookie
              }
            })
            .then(getBody)
            .catch(reject)
          })
        })
        .catch(reject)
      }
    })
  })
)

module.exports = fetchRaw
