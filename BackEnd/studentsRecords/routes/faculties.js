var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var faculty = new models.Faculties(request.body.faculty);
        faculty.save(function (error) {
            if (error) response.send(error);
            response.json({faculty: faculty});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var facultyFilter = request.query.filter;
        if (!facultyFilter) {
            models.Faculties.find(function (error, faculties) {
                if (error) response.send(error);
                response.json({faculty: faculties});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.Faculties.find({"faculty": request.query.faculty}, function (error, faculties) {
                if (error) response.send(error);
                response.json({faculty: faculties});
            });
        }
    });

router.route('/:faculty_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Faculties.findById(request.params.faculty_id, function (error, faculty) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({faculty: faculty});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Faculties.findById(request.params.faculty_id, function (error, faculty) {
            if (error) {
                response.send({error: error});
            }
            else {

                faculty.name = request.body.faculty.name;
                faculty.comment = request.body.faculty.comment;
                faculty.dept = request.body.faculty.dept;

                faculty.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({faculty: faculty});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Faculties.findByIdAndRemove(request.params.faculty_id,
            function (error, deleted) {
                if (!error) {
                    response.json({faculty: deleted});
                }
            }
        );
    });

module.exports = router;
