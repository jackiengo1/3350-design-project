/**
 * Created by Abdelkader on 2015-03-18.
 */
module.exports = function(request, response, next) {
    var start = +new Date();
    var url = request.url;
    var method = request.method;

    response.on('finish', function() {
        var duration = +new Date() - start;
        var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n';
        console.log (message);
    });
    next();
}
