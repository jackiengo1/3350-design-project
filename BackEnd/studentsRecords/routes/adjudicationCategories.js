var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
      console.log(request.body);
        var adjudicationCategory = new models.AdjudicationCategories(request.body.adjudicationCategory);
        adjudicationCategory.save(function (error) {
            if (error) response.send(error);
            response.json({adjudicationCategory: adjudicationCategory});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var adjudicationCategoryFilter = request.query.filter;
        if (!adjudicationCategoryFilter) {
            models.AdjudicationCategories.find(function (error, adjudicationCategories) {
                if (error) response.send(error);
                response.json({adjudicationCategory: adjudicationCategories});
            });
            console.log("no filter");
        } else {
          console.log("filter: " + request.query.student);
            models.AdjudicationCategories.find({"student": request.query.student}, function (error, adjudicationCategories) {
                if (error) response.send(error);
                response.json({adjudicationCategory: adjudicationCategories});
            });
        }
    });

router.route('/:adjudicationCategory_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.AdjudicationCategories.findById(request.params.adjudicationCategory_id, function (error, adjudicationCategory) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({adjudicationCategory: adjudicationCategory});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.AdjudicationCategories.findById(request.params.adjudicationCategory_id, function (error, adjudicationCategory) {
            if (error) {
                response.send({error: error});
            }
            else {
                adjudicationCategory.name = request.body.adjudicationCategory.name;
                adjudicationCategory.result = request.body.adjudicationCategory.result;
                adjudicationCategory.adjudication = request.body.adjudicationCategory.adjudication;
                adjudicationCategory.assessmentCode = request.body.adjudicationCategory.assessmentCode;

                adjudicationCategory.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({adjudicationCategory: adjudicationCategory});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.AdjudicationCategories.findByIdAndRemove(request.params.adjudicationCategory_id,
            function (error, deleted) {
                if (!error) {
                    response.json({adjudicationCategory: deleted});
                }
            }
        );
    });

module.exports = router;
