Gradespeed HISD
=========

A package that allows for easy scraping of the GradeBook page's HTML from HISD's GradeSpeed portal.

<p align="center">
    <a href="https://nodei.co/npm/gradespeed-hisd/">
        <img src="https://nodei.co/npm/gradespeed-hisd.png?downloads=true&downloadRank=true&stars=true"
            alt="NPM"></a>
</p>
<p align="center">
    <a href="https://circleci.com/gh/TheOdd/gradespeed-hisd">
        <img src="https://img.shields.io/circleci/project/github/TheOdd/gradespeed-hisd.svg"
            alt="Build Status"></a>
    <a href="https://coveralls.io/github/TheOdd/gradespeed-hisd">
      <img src="https://img.shields.io/coveralls/github/TheOdd/gradespeed-hisd.svg"
            alt="Coverage Status"></a>
    <a href="https://www.npmjs.com/package/gradespeed-hisd">
        <img src="https://img.shields.io/npm/dt/gradespeed-hisd.svg"
            alt="Downloads"></a>
    <a href="https://greenkeeper.io/">
        <img src="https://badges.greenkeeper.io/TheOdd/gradespeed-hisd.svg"
            alt="Greenkeeper"></a>
</p>

## Installation

  `npm install gradespeed-hisd`

## Usage

  `gradespeed(username, password, callback)`

    function callback(err, returnArr) {
      // Handle results from gradespeed call
    }

  The callback function takes two arguments:
  - `err` - If an error occurs when executing the function, then the error will be returned here. Otherwise, it will be `null`.

  - `returnArr` - If the call succeeds then this will be an **array of objects** that contain grade data that was scraped from the GradeBook page. If the call was unsuccessful and encountered an error, then the value will be `null`.

---

    var gradespeed = require('gradespeed-hisd');

    const username = 'YOUR USERNAME';
    const password = 'YOUR PASSWORD';

    gradespeed(username, password, function(err, returnArr) {
      if (err) {
        console.log(err);
      } else {
        console.log(returnArr);
      }
    });

## Tests

  `npm test`

## [Contributing][3]

## Notes

Right now the code is extremely messy and can be improved significantly. Both in function and style. I welcome any suggestions and PR's/issues. It currently seems to be functioning well and properly.

## ...why?

I recognize that the purpose that this package serves is extremely niche, but I found myself searching and tinkering for hours to figure out how to use a makeshift GradeSpeed API. There is no official API or documentation for it and almost nothing online. Why not make something that at the very least helped me practice making an NPM package and at the most saved someone hours of messing around and bullshit? In response to "...why?", I ask "why not?"

## Credits

I could not have done this without the hidden gem that is [@au5ton][1]'s informal [docs page][2] on the GradeSpeed portal.

[1]:https://github.com/au5ton
[2]:https://github.com/au5ton/docs/wiki/GradeSpeed-(ParentStudentConnect)
[3]:https://github.com/TheOdd/gradespeed-hisd/blob/master/CONTRIBUTING.md
