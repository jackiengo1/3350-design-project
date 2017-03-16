/**
 * Created by Abdelkader on 2017-02-17.
 */
var express = require('express');
var router = express.Router();
var Comments = require('../models/comments');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var comment = new Comments.Model(request.body.comment);
        comment.save(function (error) {
            if (error) response.send(error);
            response.json({comment: comment});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Post = request.query.post;
        if (!Post) {
            Comments.Model.find(function (error, comments) {
                if (error) response.send(error);
                response.json({comment: comments});
            });
        } else {
            Comments.Model.find({"post": request.query.post}, function (error, comments) {
                if (error) response.send(error);
                response.json({comment: comments});
            });
        }


    });

router.route('/::comment_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Comments.Model.findById(request.params.comment_id, function (error, comment) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({comment: comment});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        Comments.Model.findById(request.params.comment_id, function (error, comment) {
            if (error) {
                response.send(error);
            }
            else {
                // update the comment info
                comment.statement = request.body.comment.statement;
                // save comment
                comment.save(function (error) {
                    if (error) {
                        response.send(error);
                    } else {
                        response.status(201).json({comment: comment});
                    }
                });
            }

        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        Comments.Model.findByIdAndRemove(request.params.comment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({post: deleted});
                }
            }
        );
    });

module.exports = router;

