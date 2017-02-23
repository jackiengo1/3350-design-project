var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var termCode = new models.TermCodes(request.body.termCode);
        termCode.save(function (error) {
            if (error) response.send(error);
            response.json({termCode: termCode});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var termCodeFilter = request.query.filter;
        if (!termCodeFilter) {
            models.TermCodes.find(function (error, termCodes) {
                if (error) response.send(error);
                response.json({termCode: termCodes});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.TermCodes.find({"student": request.query.student}, function (error, termCodes) {
                if (error) response.send(error);
                response.json({termCode: termCodes});
            });
        }
    });

router.route('/:termCode_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.TermCodes.findById(request.params.termCode_id, function (error, termCode) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({termCode: termCode});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.TermCodes.findById(request.params.termCode_id, function (error, termCode) {
            if (error) {
                response.send({error: error});
            }
            else {
                termCode.name = request.termCode.name;
                termCode.courseInfo = request.termCode.courseInfo;
                termCode.program = request.termCode.program;
                termCode.studentInfo = request.termCode.studentInfo;

                termCode.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({termCode: termCode});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.TermCodes.findByIdAndRemove(request.params.termCode_id,
            function (error, deleted) {
                if (!error) {
                    response.json({termCode: deleted});
                }
            }
        );
    });

module.exports = router;
