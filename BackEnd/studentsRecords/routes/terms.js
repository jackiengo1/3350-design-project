
var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var term = new models.Terms(request.body.term);
        term.save(function(error){
          if(error) ressponse.send(error);
          console.log(term);
          response.json({terms: term});
        });

    })

    .get(parseUrlencoded, parseJSON, function (request, response) {

        var term = request.query.filter;
        if(!term){
          models.Terms.find(function (error, terms) {
              if (error) response.send(error);
              response.json({term: terms});
            });
          }
          else{
            models.Terms.find({"studentInfo": term.studentInfo}, function (error, terms) {
                if (error) response.send(error);
                console.log(terms);
                response.json({term: terms});
              });
          }

    });

    router.route('/:term_id')
        .get(parseUrlencoded, parseJSON, function (request, response) {
          models.Terms.findById(request.params.term_id, function (error, term) {
              if (error) {
                  response.send({error: error});
              }
              else {
                  response.json({term: term});
              }
          });


        })

        .put(parseUrlencoded, parseJSON, function (request, response) {
            models.Terms.findById(request.params.term_id, function (error, term) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    term.term = request.body.term.term;
                    term.program = request.body.term.program;
                    term.courseInfo = request.body.term.courseInfo;
                    term.studentInfo = request.body.term.studentInfo;
                    term.adjudicationInfo = request.body.term.adjudicationInfo;

                    term.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        }
                        else {
                            response.json({term: term});
                        }
                    });
                }
            });
        })

        .delete(parseUrlencoded, parseJSON, function (request, response) {
            models.Terms.findByIdAndRemove(request.params.term_id,
                function (error, deleted) {
                    if (!error) {
                        response.json({term: deleted});
                    }
                }
            );
        });
module.exports = router;
