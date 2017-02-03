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
            response.json({advancedStanding: advancedStanding});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        //var l = parseInt(request.query.limit);
        //var o = parseInt(request.query.offset);
        var AdvancedStanding = request.query.advancedStanding;
        if (!AdvancedStanding) {
            models.AdvancedStandings.find(function (error, advancedStandings) {
                if (error) response.send(error);
                response.json({advancedStanding: advancedStandings});
            });
            //models.AdvancedStandings.paginate({}, { offset: o, limit: l },
            //    function (error, students) {
            //        if (error) response.send(error);
            //        response.json({advancedStanding: advancedStandings.docs});
            //    });
        } else {
            //        if (Student == "residency")
            models.AdvancedStandings.find({"student": request.query.student}, function (error, advancedStandings) {
                if (error) response.send(error);
                response.json({advancedStudent: advancedStandings});
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
                advancedStanding.course = request.advancedStanding.course;
                advancedStanding.description = request.advancedStanding.description;
                advancedStanding.units = request.advancedStanding.units;
                advancedStanding.grade = request.advancedStanding.grade;
                advancedStanding.from = request.advancedStanding.from;

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
