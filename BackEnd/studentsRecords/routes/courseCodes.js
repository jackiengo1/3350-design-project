var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var courseCode = new models.CourseCodes(request.body.courseCode);
        courseCode.save(function (error) {
            if (error) response.send(error);
            response.json({courseCode: courseCode});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var courseCodeFilter = request.query.filter;
        if (!courseCodeFilter) {
            models.CourseCodes.find(function (error, courseCodes) {
                if (error) response.send(error);
                response.json({courseCode: courseCodes});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.CourseCodes.find({"courseCode": request.query.courseCode}, function (error, courseCodes) {
                if (error) response.send(error);
                response.json({courseCode: courseCodes});
            });
        }
    });

router.route('/:courseCode_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.CourseCodes.findById(request.params.courseCode_id, function (error, courseCode) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({courseCode: courseCode});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.CourseCodes.findById(request.params.courseCode_id, function (error, courseCode) {
            if (error) {
                response.send({error: error});
            }
            else {
                courseCode.courseLetter = request.courseCode.courseLetter;
                courseCode.courseNumber = request.courseCode.courseNumber;
                courseCode.name = request.courseCode.name;
                courseCode.unit = request.courseCode.unit;
                courseCode.mark = request.courseCode.mark;

                courseCode.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({courseCode: courseCode});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.CourseCodes.findByIdAndRemove(request.params.courseCode_id,
            function (error, deleted) {
                if (!error) {
                    response.json({courseCode: deleted});
                }
            }
        );
    });

module.exports = router;
