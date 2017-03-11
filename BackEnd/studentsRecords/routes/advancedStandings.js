/**
 * Created by aayush on 2/2/2017.
 */
var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var advancedStanding = new models.AdvancedStandings(request.body.advancedStanding);
        advancedStanding.save(function (error) {
            if (error) response.send(error);
            console.log( advancedStanding);
            response.json({advancedStandings: advancedStanding});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var AdvancedStanding = request.query.filter;
        if (!AdvancedStanding) {
            models.AdvancedStandings.find(function (error, advancedStandings) {
                if (error) response.send(error);
                response.json({advancedStanding: advancedStandings});
            });

        } else {

            models.AdvancedStandings.find({"studentInfo": AdvancedStanding.studentInfo}, function (error, advancedStandings) {
                if (error) response.send(error);
                console.log(advancedStandings);
                response.json({advancedStanding: advancedStandings});

            });
        }
    });

router.route('/:advancedStanding_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.AdvancedStandings.findById(request.params.advancedStanding_id, function (error, advancedStanding) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({advancedStanding: advancedStanding});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.AdvancedStandings.findById(request.params.advancedStanding_id, function (error, advancedStanding) {
            if (error) {
                response.send({error: error});
            }
            else {
                advancedStanding.course = request.body.advancedStanding.course;
                advancedStanding.description = request.body.advancedStanding.description;
                advancedStanding.units = request.body.advancedStanding.units;
                advancedStanding.grade = request.body.advancedStanding.grade;
                advancedStanding.from = request.body.advancedStanding.from;

                advancedStanding.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({advancedStanding: advancedStanding});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.AdvancedStandings.findByIdAndRemove(request.params.advancedStanding_id,
            function (error, deleted) {
                if (!error) {
                    response.json({advancedStanding: deleted});
                }
            }
        );
    });

module.exports = router;
