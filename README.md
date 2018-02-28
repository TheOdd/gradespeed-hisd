Gradespeed HISD
=========

***NOTE:*** **I am no longer a student in the HISD school district, and so my account has been deactivated on the GradeSpeed portal. This means that the tests will fail and I will no longer be able to actively develop and maintain this package. I doubt that much will change, but I just wanted to make it clear as to why the package will be going silent and failing its CI tests.**

***UPDATE:*** **I have completely disabled the CI integration for now, as it just adds unnecessary overhead to the project.**

A package that allows for easy scraping of the GradeBook page's HTML from HISD's GradeSpeed portal.

<p align="center">
    <a href="https://nodei.co/npm/gradespeed-hisd/">
        <img src="https://nodei.co/npm/gradespeed-hisd.png?downloads=true&downloadRank=true&stars=true"
            alt="NPM"></a>
</p>
<p align="center">
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

**Calling the function returns a `Promise` object that works as follows:**

    gradespeed(username, password)
    .then(returnArr => {
      // Handle return array of object
    })
    .catch(error => {
      // Error handling
    })

  The array returned by the function upon succeeding is:

  - `returnArr` - An **array of objects** that contain grade data that was scraped from the GradeBook page.

## Example output:

*Note:* There will be more than one teacher object returned in the array. An example of one of those teacher objects would be:

    {
      "teacher": "Doe, John",
      "subject": "PHYSICS A PREAP-1",
      "period": 1,
      "c1": {
        "sections": [
          {
            "name": "classwork",
            "weight": 20,
            "assignments": [
              {
                "name": "metric prefixes",
                "dateAssigned": "Sep-11",
                "dateDue": "Sep-12",
                "grade": 100
              },
              {
                "name": "metric conversion",
                "dateAssigned": "Sep-11",
                "dateDue": "Sep-12",
                "grade": 100
              },
              {
                "name": "velocity notes",
                "dateAssigned": "Sep-13",
                "dateDue": "Sep-14",
                "grade": 80
              },
              {
                "name": "2A velocity",
                "dateAssigned": "Sep-13",
                "dateDue": "Sep-14",
                "grade": 80
              },
              {
                "name": "2B acceleration",
                "dateAssigned": "Sep-18",
                "dateDue": "Sep-19",
                "grade": "Blank"
              },
              {
                "name": "acceleration_2",
                "dateAssigned": "Sep-18",
                "dateDue": "Sep-19",
                "grade": "Blank"
              },
              {
                "name": "calculator bonus",
                "dateAssigned": "Sep-19",
                "dateDue": "Sep-20",
                "grade": "Blank"
              },
              {
                "name": "2C displacement",
                "dateAssigned": "Sep-20",
                "dateDue": "Sep-21",
                "grade": "Blank"
              },
              {
                "name": "2D velocity",
                "dateAssigned": "Sep-20",
                "dateDue": "Sep-21",
                "grade": "Blank"
              },
              {
                "name": "extra credit",
                "dateAssigned": "Sep-21",
                "dateDue": "Sep-21",
                "grade": "Blank"
              },
              {
                "name": "2E velocity after any displacement",
                "dateAssigned": "Sep-25",
                "dateDue": "Sep-26",
                "grade": 100
              },
              {
                "name": "2E velocity after any displacement_2",
                "dateAssigned": "Sep-25",
                "dateDue": "Sep-26",
                "grade": 100
              },
              {
                "name": "2F falling objects",
                "dateAssigned": "Sep-27",
                "dateDue": "Sep-28",
                "grade": 90
              },
              {
                "name": "free fall 2",
                "dateAssigned": "Sep-27",
                "dateDue": "Sep-28",
                "grade": 100
              }
            ]
          },
          {
            "name": "homework",
            "weight": 10,
            "assignments": []
          },
          {
            "name": "labs",
            "weight": 25,
            "assignments": [
              {
                "name": "Reaction time lab",
                "dateAssigned": "Oct-02",
                "dateDue": "Oct-03",
                "grade": 95
              }
            ]
          },
          {
            "name": "quiz",
            "weight": 20,
            "assignments": []
          },
          {
            "name": "tests",
            "weight": 25,
            "assignments": [
              {
                "name": "cfc 1 prefixes",
                "dateAssigned": "Sep-15",
                "dateDue": "Sep-16",
                "grade": 100
              },
              {
                "name": "cfc 2 motion",
                "dateAssigned": "Sep-29",
                "dateDue": "Sep-29",
                "grade": 100
              }
            ]
          }
        ]
      },
      "c2": {
        "sections": [
          {
            "name": "classwork",
            "weight": 20,
            "assignments": [
              {
                "name": "3A resultant",
                "dateAssigned": "Oct-09",
                "dateDue": "Oct-10",
                "grade": "Blank"
              },
              {
                "name": "3B resolving vectors",
                "dateAssigned": "Oct-09",
                "dateDue": "Oct-10",
                "grade": "Blank"
              },
              {
                "name": "3B resolving vectors_2",
                "dateAssigned": "Oct-12",
                "dateDue": "Oct-16",
                "grade": 100
              },
              {
                "name": "3C adding vectors",
                "dateAssigned": "Oct-12",
                "dateDue": "Oct-16",
                "grade": 80
              },
              {
                "name": "4A net force",
                "dateAssigned": "Oct-17",
                "dateDue": "Oct-18",
                "grade": 100
              },
              {
                "name": "4B Newton's second law",
                "dateAssigned": "Oct-17",
                "dateDue": "Oct-18",
                "grade": 100
              },
              {
                "name": "2nd law_1",
                "dateAssigned": "Oct-24",
                "dateDue": "Oct-25",
                "grade": 85
              },
              {
                "name": "2nd law_3_strings",
                "dateAssigned": "Oct-26",
                "dateDue": "Oct-30",
                "grade": 100
              },
              {
                "name": "5A work",
                "dateAssigned": "Nov-06",
                "dateDue": "Nov-07",
                "grade": 100
              }
            ]
          },
          {
            "name": "homework",
            "weight": 10,
            "assignments": []
          },
          {
            "name": "labs",
            "weight": 25,
            "assignments": []
          },
          {
            "name": "quiz",
            "weight": 20,
            "assignments": []
          },
          {
            "name": "tests",
            "weight": 25,
            "assignments": [
              {
                "name": "cfu 3 vectors",
                "dateAssigned": "Oct-13",
                "dateDue": "Oct-13",
                "grade": 90
              },
              {
                "name": "cfu 4 forces",
                "dateAssigned": "Oct-20",
                "dateDue": "Oct-20",
                "grade": 100
              },
              {
                "name": "cfu 5 2nd law",
                "dateAssigned": "Oct-27",
                "dateDue": "Oct-27",
                "grade": 100
              }
            ]
          }
        ]
      },
      "c3": {
        "sections": [
          {
            "name": "classwork",
            "weight": 20,
            "assignments": [
              {
                "name": "5B  kinetic energy",
                "dateAssigned": "Nov-13",
                "dateDue": "Nov-14",
                "grade": 100
              },
              {
                "name": "5D potential energy",
                "dateAssigned": "Nov-13",
                "dateDue": "Nov-14",
                "grade": 100
              },
              {
                "name": "5C work and energy",
                "dateAssigned": "Nov-15",
                "dateDue": "Nov-16",
                "grade": 100
              },
              {
                "name": "12A Hooke's law",
                "dateAssigned": "Nov-27",
                "dateDue": "Nov-28",
                "grade": 0
              },
              {
                "name": "ave speed_work",
                "dateAssigned": "Nov-29",
                "dateDue": "Nov-30",
                "grade": 100
              },
              {
                "name": "12B SHS pendulum",
                "dateAssigned": "Nov-29",
                "dateDue": "Nov-30",
                "grade": 100
              }
            ]
          },
          {
            "name": "homework",
            "weight": 10,
            "assignments": []
          },
          {
            "name": "labs",
            "weight": 25,
            "assignments": [
              {
                "name": "rocket lab",
                "dateAssigned": "Nov-17",
                "dateDue": "Nov-17",
                "grade": "Blank"
              },
              {
                "name": "pendulum lab",
                "dateAssigned": "Nov-29",
                "dateDue": "Nov-30",
                "grade": 100
              }
            ]
          },
          {
            "name": "quiz",
            "weight": 20,
            "assignments": []
          },
          {
            "name": "tests",
            "weight": 25,
            "assignments": [
              {
                "name": "ave speed_assess",
                "dateAssigned": "Nov-29",
                "dateDue": "Nov-30",
                "grade": 100
              }
            ]
          }
        ]
      },
      "c4": null,
      "c5": null,
      "c6": null,
      "c1Avg": 96,
      "c2Avg": 96,
      "c3Avg": 95,
      "c4Avg": null,
      "c5Avg": null,
      "c6Avg": null,
      "ex1": null,
      "ex2": null,
      "sem1": 96,
      "sem2": null
    }

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
