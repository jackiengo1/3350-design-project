var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var hsCourseGrade = new models.HsCourseGrades(request.body.hscourseGrade);
        console.log(hsCourseGrade);
        hsCourseGrade.save(function (error) {
            if (error) response.send(error);
            response.json({hscourseGrade: hsCourseGrade});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var hsCourseGradeFilter = request.query.filter;
        if (!hsCourseGradeFilter)
        {
            models.HsCourseGrades.find(function (error, hsCourseGrades) {
                if (error)
                {
                    response.send(error);
                }
                response.json({hscourseGrade: hsCourseGrades});
            });
        }
        else
        {
          console.log("filter");
            models.HsCourseGrades.find({"studentInfo": request.query.filter.studentInfo}, function (error, hsCourseGrades) {
                if (error)
                {
                    response.send(error);
                }
                response.json({hscourseGrade: hsCourseGrades});
            });
        }
    });

router.route('/:hsCourseGrade_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.HsCourseGrades.findById(request.params.hsCourseGrade_id, function (error, hsCourseGrade) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({hscourseGrade: hsCourseGrade});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.HsCourseGrades.findById(request.params.hsCourseGrade_id, function (error, hsCourseGrade) {
            if (error) {
                response.send({error: error});
            }
            else {
                hsCourseGrade.mark = request.body.hsCourseGrade.mark;
                hsCourseGrade.source = request.body.hsCourseGrade.source;
                hsCourseGrade.studentInfo = request.body.hsCourseGrade.studentInfo;

                hsCourseGrade.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({hscourseGrade: hsCourseGrade});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.HsCourseGrades.findByIdAndRemove(request.params.hsCourseGrade_id,
            function (error, deleted) {
                if (!error) {
                    response.json({hscourseGrade: deleted});
                }
                else {
                  response.send({error: error});
                }
            }
        );
    });

module.exports = router;
