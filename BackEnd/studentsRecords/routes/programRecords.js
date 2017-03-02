var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var programRecord = new models.ProgramRecords(request.body.programRecord);
        programRecord.save(function (error) {
            if (error) response.send(error);
            response.json({programRecord: programRecord});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var programRecordFilter = request.query.filter;
        if (!programRecordFilter) {
            models.ProgramRecords.find(function (error, programRecords) {
                if (error) response.send(error);
                response.json({programRecord: programRecords});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.ProgramRecords.find({"programRecord": request.query.programRecord}, function (error, programRecords) {
                if (error) response.send(error);
                response.json({programRecord: programRecords});
            });
        }
    });

router.route('/:programRecord_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramRecords.findById(request.params.programRecord_id, function (error, programRecord) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({programRecord: programRecord});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramRecords.findById(request.params.programRecord_id, function (error, programRecord) {
            if (error) {
                response.send({error: error});
            }
            else {
                programRecord.name = request.programRecord.name;
                programRecord.level = request.programRecord.level;
                programRecord.load = request.programRecord.load;
                programRecord.status = request.programRecord.status;
                programRecord.plan = request.programRecord.plan;
                programRecord.semester = request.programRecord.semester;

                programRecord.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({programRecord: programRecord});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramRecords.findByIdAndRemove(request.params.programRecord_id,
            function (error, deleted) {
                if (!error) {
                    response.json({programRecord: deleted});
                }
            }
        );
    });

module.exports = router;
