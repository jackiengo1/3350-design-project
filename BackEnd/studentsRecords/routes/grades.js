var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var grade = new models.Grades(request.body.grade);
        grade.save(function (error) {
            if (error) response.send(error);
            response.json({grade: grade});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var gradeFilter = request.query.filter;
        if (!gradeFilter) {
            models.Grades.find(function (error, grades) {
                if (error) response.send(error);
                response.json({grade: grades});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.Grades.find({"grade": request.query.grade}, function (error, grades) {
                if (error) response.send(error);
                response.json({grade: grades});
            });
        }
    });

router.route('/:grade_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Grades.findById(request.params.grade_id, function (error, grade) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({grade: grade});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Grades.findById(request.params.grade_id, function (error, grade) {
            if (error) {
                response.send({error: error});
            }
            else {
                grade.mark = request.body.grade.mark;
                grade.note = request.body.grade.note;
                grade.courseInfo = request.body.grade.courseInfo;

                grade.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({grade: grade});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Grades.findByIdAndRemove(request.params.grade_id,
            function (error, deleted) {
                if (!error) {
                    response.json({grade: deleted});
                }
            }
        );
    });

module.exports = router;
