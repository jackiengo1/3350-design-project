var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var highSchoolCourse = new models.HighSchoolCourses(request.body.highSchoolCourse);
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
            console.log("no filter");
        } else {
          console.log("filter");
            models.HighSchoolCourses.find({"highSchoolCourse": request.query.highSchoolCourse}, function (error, highSchoolCourses) { //What to replace student with??
                if (error) response.send(error);
                response.json({highSchoolCourse: highSchoolCourses});
            });
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
                highSchoolCourse.level = request.highSchoolCourse.level;
                highSchoolCourse.source = request.highSchoolCourse.source;
                highSchoolCourse.unit = request.highSchoolCourse.unit;
                highSchoolCourse.school = request.highSchoolCourse.school;
                highSchoolCourse.course = request.highSchoolCourse.course;
                highSchoolCourse.hsCourseGradesInfo = request.highSchoolCourse.hsCourseGradesInfo;

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
