'use strict'

const cheerio = require('cheerio')

const parseGradeString = str => str.charCodeAt(0) === 160 ? null : parseInt(str)
const processGradeExceptions = str => {
  if (str === 'Exc') return str
  if (!str) return 'Blank'
  return parseInt(str)
}

/**
* Parses raw html returned from fetchRaw and parses it into an array of objects
* @param {string} bodyRaw
* @return {Array}
*/

const parseRaw = (bodyArr) => {
  const $ = cheerio.load(bodyArr[0][1])
  const asnBodyArr = bodyArr.slice(1)
  const returnArr = []
  const cycleLinks = []
  const mainTable = $('table.DataTable').first().children().first().children().slice(1)
  mainTable.each(function() {
    const e = $(this).children()
    cycleLinks.push([
      $(e[4]).children().first().attr('href') || null,
      $(e[5]).children().first().attr('href') || null,
      $(e[6]).children().first().attr('href') || null,
      $(e[9]).children().first().attr('href') || null,
      $(e[10]).children().first().attr('href') || null,
      $(e[11]).children().first().attr('href') || null
    ])
    returnArr.push({
      teacher: e.first().text(),
      subject: $(e[2]).text(),
      period: parseInt($(e[3]).text()),
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      c5: null,
      c6: null,
      c1Avg: parseGradeString($(e[4]).text()),
      c2Avg: parseGradeString($(e[5]).text()),
      c3Avg: parseGradeString($(e[6]).text()),
      c4Avg: parseGradeString($(e[9]).text()),
      c5Avg: parseGradeString($(e[10]).text()),
      c6Avg: parseGradeString($(e[11]).text()),
      ex1: parseGradeString($(e[7]).text()),
      ex2: parseGradeString($(e[12]).text()),
      sem1: parseGradeString($(e[8]).text()),
      sem2: parseGradeString($(e[13]).text())
    })
  })
  returnArr.forEach((clss, idx) => {
    for (let i = 0; i <= 6; i++) {
      const objKey = 'c' + i
      const avgKey = objKey + 'Avg'
      if (clss[avgKey]) {
        clss[objKey] = {
          sections: []
        }
        const targetLink = cycleLinks[idx][i - 1]
        const onlyLinks = asnBodyArr.map(arrPair => arrPair[0])
        const bodyLocation = onlyLinks.indexOf(targetLink)
        const $ = cheerio.load(asnBodyArr[bodyLocation][1])
        // We've loaded the page's HTML for specific assignments. Can access them now.
        const sections = $('.CategoryName')
        const weightPat = /(.*) - (\d+)%$/
        sections.each(function() {
          const sectionAssignments = []
          const gradeTable = $(this).next().next().children().first().children().filter(() => (
            ($(this).attr('class') !== 'TableHeader') && $(this).attr('class')
          ))
          gradeTable.each(function() {
            if ($(this).children('.DateDue').text() !== 'Due' || $(this).children('.AssignmentName').text() !== '') {
              sectionAssignments.push({
                name: $(this).children('.AssignmentName').text(),
                dateAssigned: $(this).children('.DateAssigned').text(),
                dateDue: $(this).children('.DateDue').text(),
                grade: processGradeExceptions($(this).children('.AssignmentGrade').text())
              })
            }
          })
          clss[objKey].sections.push({
            name: $(this).text().match(weightPat)[1],
            weight: parseInt($(this).text().match(weightPat)[2]),
            assignments: sectionAssignments
          })
        })
      }
    }
  })
  return returnArr
}

module.exports = parseRaw
