var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var studentsSchema = mongoose.Schema(
    {
        number: String,           //student number
        firstName: String,
        lastName: String,
        DOB: Date,
        photo: String,
        registrationComments: String,
        basisOfAdmission: String,
        admissionAverage: String,
        admissionComments: String,
        resInfo: {type: mongoose.Schema.ObjectId, ref: 'Residencies'},
        advInfo: [{type: mongoose.Schema.ObjectId, ref: 'AdvancedStandings'}],
        genderInfo: {type: mongoose.Schema.ObjectId, ref: 'Genders'},
        scholInfo: [{type: mongoose.Schema.ObjectId, ref: 'ScholarshipAwards'}],
        highSchoolCourse: [{type: mongoose.Schema.ObjectId, ref: 'HsCourseGrades'}],
        semester: [{type: mongoose.Schema.ObjectId, ref: 'Terms'}],
        adjudicationInfo: [{type: mongoose.Schema.ObjectId, ref: 'Adjudications'}]
    }
);
studentsSchema.plugin(mongoosePaginate);

var residencySchema = mongoose.Schema(
    {
        name: String,
        students: [{type: mongoose.Schema.ObjectId, ref: ('Students')}]
    }
);

var advancedStandingSchema = mongoose.Schema(
    {
        course: String,
        description: String,
        units: String,
        grade: String,
        from: String, // the school that this course is from
        studentInfo:  {type: mongoose.Schema.ObjectId, ref: 'Students'}
    }
);

var genderSchema = mongoose.Schema(
    {
        name: String,
        students: [{type: mongoose.Schema.ObjectId, ref: ('Students')}]
    }
);

var scholarshipAwardSchema = mongoose.Schema(
    {
        note: String,
        studentInfo:  {type: mongoose.Schema.ObjectId, ref: 'Students'}
    }
);

var hsCourseGradeSchema = mongoose.Schema(
  {
    mark: String,
    source: {type: mongoose.Schema.ObjectId, ref: 'HighSchoolCourses'},
    studentInfo: {type: mongoose.Schema.ObjectId, ref: 'Students'}
  }
);

var highSchoolCourseSchema = mongoose.Schema(
  {
    level: String,
    source: String,
    unit: String,
    school: {type: mongoose.Schema.ObjectId, ref: 'SecondarySchools'},
    course: {type: mongoose.Schema.ObjectId, ref: 'HighSchoolSubjects'},
    courseGrade:[{type: mongoose.Schema.ObjectId, ref: 'HsCourseGrades'}]
  }
);

var secondarySchoolSchema = mongoose.Schema(
  {
    name: String,
    highSchoolCoursesInfo: [{type: mongoose.Schema.ObjectId, ref: ('HighSchoolCourses')}]
  }
);

var highSchoolSubjectSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    highSchoolCoursesInfo: [{type: mongoose.Schema.ObjectId, ref: ('HighSchoolCourses')}]

  }
);

var programRecordSchema = mongoose.Schema(
  {
    name: String,
    level: String,
    load: String,
    status: String,
    plan : [{type: mongoose.Schema.ObjectId, ref: 'PlanCodes'}],
    semester: [{type: mongoose.Schema.ObjectId, ref: 'Terms'}]
  }
);

var termCodeSchema = mongoose.Schema(
  {
    name: String,
    semester: [{type: mongoose.Schema.ObjectId, ref: 'Terms'}],

  }
);

var planCodeSchema = mongoose.Schema(
  {
    name: String,
    program: [{type: mongoose.Schema.ObjectId, ref: 'ProgramRecords'}]
  }
);

var courseCodeSchema = mongoose.Schema(
  {
    courseLetter: String,
    courseNumber: String,
    name: String,
    unit: String,
    mark: {type: mongoose.Schema.ObjectId, ref: 'Grades'},
    semester: {type: mongoose.Schema.ObjectId, ref: 'Terms'}
  }
);

var gradeSchema = mongoose.Schema(
  {
    mark: String,
    note: String,
    courseInfo: [{type: mongoose.Schema.ObjectId, ref: 'CourseCodes'}]
  }
);

var termSchema = mongoose.Schema(
  {
    term: {type: mongoose.Schema.ObjectId, ref: 'TermCodes'},
    program: [{type: mongoose.Schema.ObjectId, ref: 'ProgramRecords'}],
    courseInfo: [{type: mongoose.Schema.ObjectId, ref: 'CourseCodes'}],
    studentInfo: {type: mongoose.Schema.ObjectId, ref: 'Students'},
    adjudicationInfo: [{type: mongoose.Schema.ObjectId, ref: 'Adjudications'}]
  }
);

////////////////////////////////////////////////////////////////////////////////

var adjudicationSchema = mongoose.Schema(
  {
    date: String,
    termAVG: String,
    termUnitPassed: String,
    termUnitsTotal: String,
    note: String,
    studentInfo: {type: mongoose.Schema.ObjectId, ref: 'Students'},
    semester: {type: mongoose.Schema.ObjectId, ref: 'Terms'},
    comment: {type: mongoose.Schema.ObjectId, ref: 'AssessmentCodes'}
  }
);

var assessmentCodeSchema = mongoose.Schema(
  {
    code: String,
    name: String,
    adjudicationInfo: [{type: mongoose.Schema.ObjectId, ref: 'Adjudications'}],
    testExpression: [{type: mongoose.Schema.ObjectId, ref: 'LogicalExpressions'}],
    faculty: [{type: mongoose.Schema.ObjectId, ref: 'Faculties'}]
  }
);

var logicalExpressionSchema = mongoose.Schema(
  {
    booleanExp: String,
    logicalLink: String,
    comment: {type: mongoose.Schema.ObjectId, ref: 'AssessmentCodes'},
    link: [{type: mongoose.Schema.ObjectId, ref: 'LogicalExpressions'}]
  }
);

var facultySchema = mongoose.Schema(
  {
    name: String,
    comment: {type: mongoose.Schema.ObjectId, ref: 'AssessmentCodes'},
    dept: [{type: mongoose.Schema.ObjectId, ref: 'Departments'}]
  }
);

var departmentSchema = mongoose.Schema(
  {
    name: String,
    faculty: {type: mongoose.Schema.ObjectId, ref: 'Faculties'},
    programAdministrationInfo: [{type: mongoose.Schema.ObjectId, ref: 'ProgramAdministrations'}]
  }
);

var programAdministrationSchema = mongoose.Schema(
  {
    name: String,
    position: String,
    dept: {type: mongoose.Schema.ObjectId, ref: 'Departments'}
  }
);

var ScholarshipAwards = mongoose.model('scholarshopAward', scholarshipAwardSchema);
var AdvancedStandings = mongoose.model('advancedStanding', advancedStandingSchema);
var Genders = mongoose.model('gender', genderSchema);
var Students = mongoose.model('student', studentsSchema);
var Residencies = mongoose.model('residency', residencySchema);
var HsCourseGrades = mongoose.model('hsCourseGrade', hsCourseGradeSchema);
var HighSchoolCourses = mongoose.model('highSchoolCourse', highSchoolCourseSchema);
var HighSchoolSubjects = mongoose.model('highSchoolSubject', highSchoolSubjectSchema);
var SecondarySchools = mongoose.model('secondarySchool', secondarySchoolSchema);
var ProgramRecords = mongoose.model('programRecord', programRecordSchema);
var TermCodes = mongoose.model('termCode', termCodeSchema);
var PlanCodes = mongoose.model('planCode', planCodeSchema);
var CourseCodes = mongoose.model('courseCode', courseCodeSchema);
var Grades = mongoose.model('grade', gradeSchema);
var Terms = mongoose.model('term', termSchema);
////
var Adjudications = mongoose.model('adjudication', adjudicationSchema);
var AssessmentCodes = mongoose.model('assessmentcode', assessmentCodeSchema);
var LogicalExpressions = mongoose.model('logicalexpression', logicalExpressionSchema);
var Faculties = mongoose.model('faculty', facultySchema);
var Departments = mongoose.model('department', departmentSchema);
var ProgramAdministrations = mongoose.model('programadministration', programAdministrationSchema);

mongoose.connect('mongodb://localhost/studentsRecords');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    exports.Students = Students;
    exports.Residencies = Residencies;
    exports.Genders = Genders;
    exports.AdvancedStandings = AdvancedStandings;
    exports.ScholarshipAwards = ScholarshipAwards;
    exports.HsCourseGrades = HsCourseGrades;
    exports.HighSchoolCourses = HighSchoolCourses;
    exports.HighSchoolSubjects = HighSchoolSubjects;
    exports.SecondarySchools = SecondarySchools;
    exports.ProgramRecords = ProgramRecords;
    exports.TermCodes = TermCodes;
    exports.PlanCodes = PlanCodes;
    exports.CourseCodes = CourseCodes;
    exports.Grades = Grades;
    exports.Terms = Terms;
    ////
    exports.Adjudications = Adjudications;
    exports.AssessmentCodes = AssessmentCodes;
    exports.LogicalExpressions = LogicalExpressions;
    exports.Faculties = Faculties;
    exports.Departments = Departments;
    exports.ProgramAdministrations = ProgramAdministrations;
});
