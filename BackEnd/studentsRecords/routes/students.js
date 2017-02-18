var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
.post(parseUrlencoded, parseJSON, function (request, response) {
  var student = new models.Students(request.body.student);
  student.save(function (error) {
    if (error) response.send(error);
    response.json({student: student});
  });
})
.get(parseUrlencoded, parseJSON, function (request, response) {

  var l = parseInt(request.query.limit) ;
  var o = parseInt(request.query.offset);

  var studentNum = request.query.findStudentNum;
  var firstName = request.query.findStudentFirstName;
  var lastName = request.query.findStudentLastName;


  if(studentNum){

    console.log("inside finding");
    console.log("studentNum: " + request.query.findStudentNum);

    console.log(typeof request.query.findStudentNum);
    models.Students.find({number: request.query.findStudentNum}, function (error, students) {
        if (error) response.send(error);

        console.log(students);
        response.json({student: students});

    });
  }
  else if(firstName && lastName){
    console.log("inside finding");
    console.log("student first name: " + request.query.findStudentFirstName);
    console.log("student last name: " + request.query.findStudentLastName);

    console.log(typeof request.query.findStudentFirstName);
    models.Students.find({firstName: request.query.findStudentFirstName, lastName: request.query.findStudentLastName}, function (error, students) {
        if (error) response.send(error);

        console.log(students);
        response.json({student: students});

    });

  }
  else if(firstName){
    console.log("inside finding");
    console.log("student first name: " + request.query.findStudentFirstName);

    console.log(typeof request.query.findStudentFirstName);
    models.Students.find({firstName: request.query.findStudentFirstName}, function (error, students) {
        if (error) response.send(error);

        console.log(students);
        response.json({student: students});

    });

  }
  else if(lastName){
    console.log("inside finding");
    console.log("student last name: " + request.query.findStudentLastName);

    console.log(typeof request.query.findStudentLastName);
    models.Students.find({lastName: request.query.findStudentLastName}, function (error, students) {
        if (error) response.send(error);

        console.log(students);
        response.json({student: students});

    });

  }
  else{
    console.log("inisde else");

    var Student = request.query.student;
    if (!Student) {

      models.Students.paginate({}, { offset: o, limit: l },
        function (error, students) {
          if (error) response.send(error);
          response.json({student: students.docs});
        });
      } else {
        //        if (Student == "residency")
        models.Students.find({"residency": request.query.residency}, function (error, students) {
          if (error) response.send(error);
          response.json({student: students});

        });

        models.Students.find({"gender": request.query.gender}, function (error, students) {
          if (error) response.send(error);
          response.json({student: students});

        });
      }
    }
  });

  router.route('/:student_id')
  .get(parseUrlencoded, parseJSON, function (request, response) {
    models.Students.findById(request.params.student_id, function (error, student) {
      if (error) {
        response.send({error: error});
      }
      else {
        response.json({student: student});
      }
    });
  })
  .put(parseUrlencoded, parseJSON, function (request, response) {
    models.Students.findById(request.params.student_id, function (error, student) {

      if (error) {
        response.send({error: error});
      }
      else {
        student.number = request.body.student.number;
        student.firstName = request.body.student.firstName;
        student.lastName = request.body.student.lastName;
        student.gender = request.body.student.gender;
        student.DOB = request.body.student.DOB;
        student.photo = request.body.student.photo;

        //new
        student.registrationComments = request.body.student.registrationComments;
        student.basisOfAdmission = request.body.student.basisOfAdmission;
        student.admissionAverage = request.body.student.admissionAverage;
        student.admissionComments = request.body.student.admissionComments;
        student.advInfo = request.body.student.advInfo;
        student.genderInfo = request.body.student.genderInfo;
        student.scholInfo = request.body.student.scholInfo;
        //

        student.resInfo = request.body.student.resInfo;

        student.save(function (error) {
          if (error) {
            response.send({error: error});
          }
          else {
            response.json({student: student});
          }
        });
      }
    });
  })
  .delete(parseUrlencoded, parseJSON, function (request, response) {
    models.Students.findByIdAndRemove(request.params.student_id,
      function (error, deleted) {
        if (!error) {
          response.json({student: deleted});
        }
      }
    );
  });

  module.exports = router;
