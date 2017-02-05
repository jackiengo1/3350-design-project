var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var studentsSchema = mongoose.Schema(
    {
        number: String,
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
        scholInfo: [{type: mongoose.Schema.ObjectId, ref: 'ScholarshipAwards'}]
    }
);
studentsSchema.plugin(mongoosePaginate);

var residencySchema = mongoose.Schema(
    {
        name: String,
        students: [{type: mongoose.Schema.ObjectId, ref: ('Students')}]
    }
);

//////////////////////////////////////////////// Phase 1

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

var ScholarshipAwards = mongoose.model('scholarshopAward', scholarshipAwardSchema);
var AdvancedStandings = mongoose.model('advancedStanding', advancedStandingSchema);
var Genders = mongoose.model('gender', genderSchema);


////////////////////////////////////////////////

var Students = mongoose.model('student', studentsSchema);
var Residencies = mongoose.model('residency', residencySchema);


mongoose.connect('mongodb://localhost/studentsRecords');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    exports.Students = Students;
    exports.Residencies = Residencies;
    exports.Genders = Genders;
    exports.AdvancedStandings = AdvancedStandings;
    exports.ScholarshipAwards = ScholarshipAwards;

});
