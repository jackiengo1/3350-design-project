var express = require('express');
var logger = require('./logger');
var app = express();

var students = require('./routes/students');
var residencies = require('./routes/residencies');
var genders = require('./routes/genders');
var advancedStandings = require('./routes/advancedStandings');
var scholarshipAwards = require('./routes/scholarshipAwards');
var courseCodes = require('./routes/courseCodes');
var termCodes = require('./routes/termCodes');
var planCodes = require('./routes/planCodes');
var highSchoolCourses = require('./routes/highSchoolCourses');
var highSchoolSubjects = require('./routes/highSchoolSubjects');
var hsCourseGrades = require('./routes/hsCourseGrades');
var secondarySchools = require('./routes/secondarySchools');
var programRecords = require('./routes/programRecords');
var grades = require('./routes/grades');
var terms = require('./routes/terms');
////
var adjudications = require('./routes/adjudications');
var assessmentCodes = require('./routes/assessmentCodes');
var logicalExpressions = require('./routes/logicalExpressions');
var faculties = require('./routes/faculties');
var departments = require('./routes/departments');
var programAdministrations = require('./routes/programAdministrations');

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(logger);
//app.use(express.static('public'));

app.use('/students', students);
app.use('/residencies', residencies);
app.use('/genders', genders);
app.use('/advancedStandings', advancedStandings);
app.use('/scholarshipAwards', scholarshipAwards);
app.use('/grades', grades);
app.use('/courseCodes', courseCodes);
app.use('/termCodes', termCodes);
app.use('/planCodes', planCodes);
app.use('/highSchoolCourses', highSchoolCourses);
app.use('/highSchoolSubjects', highSchoolSubjects);
app.use('/hsCourseGrades', hsCourseGrades);
app.use('/secondarySchools', secondarySchools);
app.use('/programRecords', programRecords);
app.use('/terms', terms);
////
app.use('/adjudications', adjudications);
app.use('/assessmentCodes', assessmentCodes);
app.use('/logicalExpressions', logicalExpressions);
app.use('/faculties', faculties);
app.use('/departments', departments);
app.use('/programAdministrations', programAdministrations);


app.listen(3700, function () {
    console.log('Listening on port 3700');
});
