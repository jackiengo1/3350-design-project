var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var logicalExpression = new models.LogicalExpressions(request.body.logicalExpression);
        logicalExpression.save(function (error) {
            if (error) response.send(error);
            response.json({logicalExpression: logicalExpression});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var logicalExpressionFilter = request.query.filter;
        if (!logicalExpressionFilter) {
            models.LogicalExpressions.find(function (error, logicalExpressions) {
                if (error) response.send(error);
                response.json({logicalExpression: logicalExpressions});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.LogicalExpressions.find({"logicalExpression": request.query.logicalExpression}, function (error, logicalExpressions) {
                if (error) response.send(error);
                response.json({logicalExpression: logicalExpressions});
            });
        }
    });

router.route('/:logicalExpression_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.LogicalExpressions.findById(request.params.logicalExpression_id, function (error, logicalExpression) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({logicalExpression: logicalExpression});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.LogicalExpressions.findById(request.params.logicalExpression_id, function (error, logicalExpression) {
            if (error) {
                response.send({error: error});
            }
            else {
                logicalExpression.booleanExp = request.body.logicalExpression.booleanExp;
                logicalExpression.logicalLink = request.body.logicalExpression.logicalLink;
                logicalExpression.comment = request.body.logicalExpression.comment;
                logicalExpression.link = request.body.logicalExpression.link;

                logicalExpression.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({logicalExpression: logicalExpression});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.LogicalExpressions.findByIdAndRemove(request.params.logicalExpression_id,
            function (error, deleted) {
                if (!error) {
                    response.json({logicalExpression: deleted});
                }
            }
        );
    });

module.exports = router;
