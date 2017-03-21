/**
 * Created by aayush on 2/2/2017.
 */
var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();
var XLSX = require('xlsx');

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        console.log("test start");
        console.log(request.body);
        var gender = new models.Genders(request.body.gender);
        console.log(request.body);
        gender.save(function (error) {
            if (error) response.send(error);
            response.json({gender: gender});
        });

    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Student = request.query.filter;
        if (!Student) {
            models.Genders.find(function (error, genders) {
                if (error) response.send(error);
                response.json({gender: genders});
            });
        } else {
            models.Genders.find({"student": Student.student}, function (error, students) {
                if (error) response.send(error);
                response.json({gender: students});
            });
        }
    });

router.route('/:gender_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Genders.findById(request.params.gender_id, function (error, gender) {
            if (error) response.send(error);
            response.json({gender: gender});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
      console.log(request.params);
        models.Genders.findById(request.params.gender_id, function (error, gender) {
            if (error) {
                response.send({error: error});
            }
            else {
              console.log(gender);
                gender.name = request.body.gender.name;
                gender.students = request.body.gender.students;

                gender.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({gender: gender});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Genders.findByIdAndRemove(request.params.gender_id,
            function (error, deleted) {
                if (!error) {
                    response.json({gender: deleted});
                }
            }
        );
    });
module.exports = router;
