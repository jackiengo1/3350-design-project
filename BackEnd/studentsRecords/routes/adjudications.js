var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var adjudication = new models.Adjudications(request.body.adjudication);
        adjudication.save(function (error) {
            if (error) response.send(error);
            response.json({adjudication: adjudication});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var adjudicationFilter = request.query.filter;
        if (!adjudicationFilter) {
            models.Adjudications.find(function (error, adjudications) {
                if (error) response.send(error);
                response.json({adjudication: adjudications});
            });
            console.log("noooooo filter");
        } else {//if(adjudicationFilter == "student"){
          console.log("student filter");
            models.Adjudications.find({"student": request.query.student}, function (error, adjudications) {
                if (error) response.send(error);
                response.json({adjudication: adjudications});
            });
        }
        // else if(request.query.semester){
        //         console.log("adjudication filter");
        //   models.Adjudications.find({"semester": request.query.semester}, function (error, adjudications) {
        //       if (error) response.send(error);
        //       response.json({adjudication: adjudications});
        //   });

          /*else{
            models.Adjudications.find({"semester": request.query.semester}, function (error, adjudications) {
                if (error) response.send(error);
                response.json({adjudication: adjudications});
            });
          }*/
    });

router.route('/:adjudication_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Adjudications.findById(request.params.adjudication_id, function (error, adjudication) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({adjudication: adjudication});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Adjudications.findById(request.params.adjudication_id, function (error, adjudication) {
            if (error) {
                response.send({error: error});
            }
            else {
                adjudication.date = request.body.adjudication.date;
                adjudication.termAVG = request.body.adjudication.termAVG;
                adjudication.termUnitPassed = request.body.adjudication.termUnitPassed;
                adjudication.termUnitsTotal = request.body.adjudication.termUnitsTotal;
                adjudication.note = request.body.adjudication.note;
                adjudication.studentInfo = request.body.adjudication.studentInfo;
                adjudication.semester = request.body.adjudication.semester;
                adjudication.comment = request.body.adjudication.comment;

                adjudication.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({adjudication: adjudication});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Adjudications.findByIdAndRemove(request.params.adjudication_id,
            function (error, deleted) {
                if (!error) {
                    response.json({adjudication: deleted});
                }
            }
        );
    });

module.exports = router;
