var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var category = new models.Categories(request.body.category);
        category.save(function (error) {
            if (error) response.send(error);
            response.json({category: category});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var categoryFilter = request.query.filter;
        if (!categoryFilter) {
            models.Categories.find(function (error, categories) {
                if (error) response.send(error);
                response.json({category: categories});
            });
            console.log("no filter");
        } else {
          console.log("filter: " + request.query.student);
            models.Categories.find({"student": request.query.student}, function (error, categories) {
                if (error) response.send(error);
                response.json({category: categories});
            });
        }
    });

router.route('/:category_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Categories.findById(request.params.category_id, function (error, category) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({category: category});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Categories.findById(request.params.category_id, function (error, category) {
            if (error) {
                response.send({error: error});
            }
            else {
                category.name = request.body.category.name;
                category.code = request.body.category.code;
                category.category = request.body.category.adjudicationList;

                category.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({category: category});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Categories.findByIdAndRemove(request.params.category_id,
            function (error, deleted) {
                if (!error) {
                    response.json({category: deleted});
                }
            }
        );
    });

module.exports = router;
