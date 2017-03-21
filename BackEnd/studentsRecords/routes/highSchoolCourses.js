var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var highSchoolCourse = new models.HighSchoolCourses(request.body.highSchoolCourse);
        console.log(highSchoolCourse);
        highSchoolCourse.save(function (error) {
            if (error) response.send(error);
            response.json({highSchoolCourse: highSchoolCourse});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var highSchoolCourseFilter = request.query.filter;
        if (!highSchoolCourseFilter) {
            models.HighSchoolCourses.find(function (error, highSchoolCourses) {
                if (error) response.send(error);
                response.json({highSchoolCourse: highSchoolCourses});
            });
            console.log("no filter 1");
        } else {
          if(request.query.filter.school)
          {
            models.HighSchoolCourses.find({"school": request.query.filter.school}, function (error, highSchoolCourses) { //What to replace student with??
                if (error) response.send(error);
                response.json({highSchoolCourse: highSchoolCourses});
            });
          }
          else if (request.query.filter.id)
          {
            models.HighSchoolCourses.find({"_id": request.query.filter.id}, function (error, highSchoolCourses) { //What to replace student with??
                if (error) response.send(error);
                console.log(highSchoolCourses);
                response.json({highSchoolCourse: highSchoolCourses});
            });
          }
          else
          {
            models.HighSchoolCourses.find({"highSchoolCourse": request.query.highSchoolCourse}, function (error, highSchoolCourses) { //What to replace student with??
                if (error) response.send(error);
                response.json({highSchoolCourse: highSchoolCourses});
            });
          }
        }
    });

router.route('/:highSchoolCourse_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.HighSchoolCourses.findById(request.params.highSchoolCourse_id, function (error, highSchoolCourse) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({highSchoolCourse: highSchoolCourse});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.HighSchoolCourses.findById(request.params.highSchoolCourse_id, function (error, highSchoolCourse) {
            if (error) {
                response.send({error: error});
            }
            else {
                highSchoolCourse.level = request.body.highSchoolCourse.level;
                highSchoolCourse.source = request.body.highSchoolCourse.source;
                highSchoolCourse.unit = request.body.highSchoolCourse.unit;
                highSchoolCourse.school = request.body.highSchoolCourse.school;
                highSchoolCourse.course = request.body.highSchoolCourse.course;
                highSchoolCourse.hsCourseGradesInfo = request.body.highSchoolCourse.hsCourseGradesInfo;

                highSchoolCourse.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({highSchoolCourse: highSchoolCourse});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.HighSchoolCourses.findByIdAndRemove(request.params.highSchoolCourse_id,
            function (error, deleted) {
                if (!error) {
                    response.json({highSchoolCourse: deleted});
                }
            }
        );
    });

module.exports = router;
