var mongoose = require('mongoose');
var postsSchema = mongoose.Schema(
    {
        title: String,
        body: String,
        comments: [{type: mongoose.Schema.ObjectId, ref: 'Comments'}]
    }
);

var Posts = mongoose.model('post', postsSchema);
exports.Model = Posts;

