var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var department = new models.Departments(request.body.department);
        department.save(function (error) {
            if (error) response.send(error);
            response.json({department: department});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {

        var departmentFilter = request.query.filter;
        if (!departmentFilter) {
            models.Departments.find(function (error, departments) {
                if (error) response.send(error);
                response.json({department: departments});
            });
            console.log("no filter");
        } else {
          console.log("filter");
            models.Departments.find({"department": request.query.department}, function (error, departments) {
                if (error) response.send(error);
                response.json({department: departments});
            });
        }
    });

router.route('/:department_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Departments.findById(request.params.department_id, function (error, department) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({department: department});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Departments.findById(request.params.department_id, function (error, department) {
            if (error) {
                response.send({error: error});
            }
            else {

                department.name = request.body.department.name;
                department.faculty = request.body.department.faculty;
                department.programAdministrationInfo = request.body.department.programAdministrationInfo;

                department.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({department: department});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Departments.findByIdAndRemove(request.params.department_id,
            function (error, deleted) {
                if (!error) {
                    response.json({department: deleted});
                }
            }
        );
    });

module.exports = router;
