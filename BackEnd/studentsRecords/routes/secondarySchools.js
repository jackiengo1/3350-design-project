var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var secondarySchool = new models.SecondarySchools(request.body.secondarySchool);
        secondarySchool.save(function (error) {
            if (error) response.send(error);
            response.json({secondarySchool: secondarySchool});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var secondarySchoolFilter = request.query.filter;
        if (!secondarySchoolFilter) {
            models.SecondarySchools.find(function (error, secondarySchools) {
                if (error) response.send(error);
                response.json({secondarySchool: secondarySchools});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.SecondarySchools.find({"secondarySchool": request.query.secondarySchool}, function (error, secondarySchools) {
                if (error) response.send(error);
                response.json({secondarySchool: secondarySchools});
            });
        }
    });

router.route('/:secondarySchool_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.SecondarySchools.findById(request.params.secondarySchool_id, function (error, secondarySchool) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({secondarySchool: secondarySchool});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.SecondarySchools.findById(request.params.secondarySchool_id, function (error, secondarySchool) {
            if (error) {
                response.send({error: error});
            }
            else {
                secondarySchool.name = request.secondarySchool.name;
                secondarySchool.highSchoolCoursesInfo = request.secondarySchool.highSchoolCoursesInfo;

                secondarySchool.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({secondarySchool: secondarySchool});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.SecondarySchools.findByIdAndRemove(request.params.secondarySchool_id,
            function (error, deleted) {
                if (!error) {
                    response.json({secondarySchool: deleted});
                }
            }
        );
    });

module.exports = router;
