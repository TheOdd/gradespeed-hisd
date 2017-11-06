'use strict';

var cheerio = require('cheerio');

function parseGradeString(str) {
  return str.charCodeAt(0) === 160 ? null : parseInt(str)
}

/**
* Parses raw html returned from fetchRaw and parses it into an array of objects
* @param {string} bodyRaw
* @return {Array}
*/
module.exports = function(bodyArr) {
  var $ = cheerio.load(bodyArr[0][1]);
  var asnBodyArr = bodyArr.slice(1);
  var returnArr = [];
  var cycleLinks = [];
  var mainTable = $('table.DataTable').first().children().first().children().slice(1);
  mainTable.each(function() {
    var e = $(this).children();
    cycleLinks.push([
      $(e[4]).children().first().attr('href') || null,
      $(e[5]).children().first().attr('href') || null,
      $(e[6]).children().first().attr('href') || null,
      $(e[9]).children().first().attr('href') || null,
      $(e[10]).children().first().attr('href') || null,
      $(e[11]).children().first().attr('href') || null
    ]);
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
    });
  });
  returnArr.forEach(function(clss, idx) {
    for (var i = 0; i <= 6; i++) {
      var objKey = 'c' + i;
      var avgKey = objKey + 'Avg';
      if (clss[avgKey]) {
        clss[objKey] = {
          sections: []
        };
        var targetLink = cycleLinks[idx][i - 1];
        var onlyLinks = asnBodyArr.map(function(arrPair) {
          return arrPair[0];
        });
        var bodyLocation = onlyLinks.indexOf(targetLink);
        let $ = cheerio.load(asnBodyArr[bodyLocation][1]);
        // We've loaded the page's HTML for specific assignments. Can access them now.
        var sections = $('.CategoryName');
        var weightPat = /(.*) - (\d+)%$/;
        sections.each(function() {
          let sectionAssignments = [];
          let gradeTable = $(this).next().next().children().first().children().filter(function() {
            return ($(this).attr('class') !== 'TableHeader') && $(this).attr('class');
          });
          gradeTable.each(function() {
            sectionAssignments.push({
              name: $(this).children('.AssignmentName').text(),
              dateAssigned: $(this).children('.DateAssigned').text(),
              dateDue: $(this).children('.DateDue').text(),
              grade: $(this).children('.AssignmentGrade').text() ? parseInt($(this).children('.AssignmentGrade').text()) : 'Blank'
            });
          });
          clss[objKey].sections.push({
            name: $(this).text().match(weightPat)[1],
            weight: parseInt($(this).text().match(weightPat)[2]),
            assignments: sectionAssignments
          })
        })
      }
    }
  });
  return returnArr;
};
