var express = require('express');
var router = express.Router();
var Posts = require('../models/posts');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var post = new Posts.Model(request.body.post);
        post.save(function (error) {
            if (error) response.send(error);
            response.json({post: post});
        });


    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Posts.Model.find(function (error, posts) {
                if (error) response.send(error);
                response.json({post: posts});
            });
    });

router.route('/:post_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Posts.Model.findById(request.params.post_id, function (error, post) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({post: post});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        Posts.Model.findById(request.params.post_id, function (error, post) {
            if (error) {
                response.send({error: error});
            }
            else {
                post.title = request.body.post.title;
                post.body = request.body.post.body;
                post.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({post: post});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        Posts.Model.findByIdAndRemove(request.params.post_id,
            function (error, deleted) {
                if (!error) {
                    response.json({post: deleted});
                }
            }
        );
    });

module.exports = router;
