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
        //
        hsCourseGradesInfo: [{type: mongoose.Schema.ObjectId, ref: 'HsCourseGrades'}],
        // ^ used to be this: highSchoolCourse: [{type: mongoose.Schema.ObjectId, ref: 'HsCourseGrades'}],
        // change back if it causes issues
        semester: [{type: mongoose.Schema.ObjectId, ref: 'TermCodes'}]
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
    hsCourseGradesInfo: [{type: mongoose.Schema.ObjectId, ref: 'HsCourseGrades'}]
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
    semester: [{type: mongoose.Schema.ObjectId, ref: 'TermCodes'}]
  }
);

var termCodeSchema = mongoose.Schema(
  {
    name: String,
    courseInfo: [{type: mongoose.Schema.ObjectId, ref: 'CourseCodes'}],
    program: [{type: mongoose.Schema.ObjectId, ref: 'ProgramRecords'}],
    studentInfo: {type: mongoose.Schema.ObjectId, ref: 'Students'}
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
    mark: [{type: mongoose.Schema.ObjectId, ref: 'Grades'}],
    semester: {type: mongoose.Schema.ObjectId, ref: 'TermCodes'}
  }
);

var gradeSchema = mongoose.Schema(
  {
    mark: String,
    note: String,
    courseInfo: [{type: mongoose.Schema.ObjectId, ref: 'CourseCodes'}]
  }
);

var ScholarshipAwards = mongoose.model('scholarshopAward', scholarshipAwardSchema);
var AdvancedStandings = mongoose.model('advancedStanding', advancedStandingSchema);
var Genders = mongoose.model('gender', genderSchema);
var Students = mongoose.model('student', studentsSchema);
var Residencies = mongoose.model('residency', residencySchema);
//New
var HsCourseGrades = mongoose.model('hsCourseGrade', hsCourseGradeSchema);
var HighSchoolCourses = mongoose.model('highSchoolCourse', highSchoolCourseSchema);
var HighSchoolSubjects = mongoose.model('highSchoolSubject', highSchoolSubjectSchema);
var SecondarySchools = mongoose.model('secondarySchool', secondarySchoolSchema);
//
var ProgramRecords = mongoose.model('programRecord', programRecordSchema);
var TermCodes = mongoose.model('termCode', termCodeSchema);
var PlanCodes = mongoose.model('planCode', planCodeSchema);
var CourseCodes = mongoose.model('courseCode', courseCodeSchema);
var Grades = mongoose.model('grade', gradeSchema);

mongoose.connect('mongodb://localhost/studentsRecords');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    exports.Students = Students;
    exports.Residencies = Residencies;
    exports.Genders = Genders;
    exports.AdvancedStandings = AdvancedStandings;
    exports.ScholarshipAwards = ScholarshipAwards;
    //New
    exports.HsCourseGrades = HsCourseGrades;
    exports.HighSchoolCourses = HighSchoolCourses;
    exports.HighSchoolSubjects = HighSchoolSubjects;
    exports.SecondarySchools = SecondarySchools;
    //
    exports.ProgramRecords = ProgramRecords;
    exports.TermCodes = TermCodes;
    exports.PlanCodes = PlanCodes;
    exports.CourseCodes = CourseCodes;
    exports.Grades = Grades;

});
