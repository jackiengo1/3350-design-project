var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var scholarshipAward = new models.ScholarshipAwards(request.body.scholarshipAward);
        scholarshipAward.save(function (error) {
            if (error) response.send(error);
            response.json({scholarshipAward: scholarshipAward});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var scholarshipAwardFilter = request.query.filter;
        if (!scholarshipAwardFilter) {
            models.ScholarshipAwards.find(function (error, scholarshipAwards) {
                if (error) response.send(error);
                response.json({scholarshipAward: scholarshipAwards});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.ScholarshipAwards.find({"student": request.query.student}, function (error, scholarshipAwards) {
                if (error) response.send(error);
                response.json({scholarshipAward: scholarshipAwards});
            });
        }
    });

router.route('/:scholarshipAward_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.ScholarshipAwards.findById(request.params.scholarshipAward_id, function (error, scholarshipAward) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({scholarshipAward: scholarshipAward});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.ScholarshipAwards.findById(request.params.scholarshipAward_id, function (error, scholarshipAward) {
            if (error) {
                response.send({error: error});
            }
            else {
                scholarshipAward.note = request.scholarshipAward.note;

                scholarshipAward.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({scholarshipAward: scholarshipAward});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.ScholarshipAwards.findByIdAndRemove(request.params.scholarshipAward_id,
            function (error, deleted) {
                if (!error) {
                    response.json({scholarshipAward: deleted});
                }
            }
        );
    });

module.exports = router;
