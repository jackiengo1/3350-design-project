var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var adjudicationResult = new models.Adjudications(request.body.adjudicationResult);
        adjudicationResult.save(function (error) {
            if (error) response.send(error);
            response.json({adjudicationResult: adjudicationResult});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var adjudicationResultFilter = request.query.filter;
        if (!adjudicationResultFilter) {
            models.AdjudicationResults.find(function (error, adjudicationResults) {
                if (error) response.send(error);
                response.json({adjudicationResult: adjudicationResults});
            });
            console.log("no filter");
        } else {
          console.log("filter: " + request.query.adjudicationResult);
            models.adjudicationResult.find({"adjudicationResult": request.query.adjudicationResult}, function (error, adjudicationResults) {
                if (error) response.send(error);
                response.json({adjudicationResult: adjudicationResults});
            });
        }
    });

router.route('/:adjudicationResult_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Adjudications.findById(request.params.adjudicationResult_id, function (error, adjudicationResult) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({adjudicationResult: adjudicationResult});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.AdjudicationResults.findById(request.params.adjudicationResult_id, function (error, adjudicationResult) {
            if (error) {
                response.send({error: error});
            }
            else {
                adjudicationResult.name = request.body.adjudicationResult.name;
                adjudicationResult.result = request.body.adjudicationResult.result;
                adjudicationResult.adjudication = request.body.adjudicationResult.adjudication;
                adjudicationResult.assessmentCode = request.body.adjudicationResult.assessmentCode;

                adjudicationResult.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({adjudicationResult: adjudicationResult});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.AdjudicationResults.findByIdAndRemove(request.params.adjudicationResult_id,
            function (error, deleted) {
                if (!error) {
                    response.json({adjudicationResult: deleted});
                }
            }
        );
    });

module.exports = router;
