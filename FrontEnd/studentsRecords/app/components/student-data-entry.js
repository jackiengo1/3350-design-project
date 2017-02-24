import Ember from 'ember';
//first and last broken

export default Ember.Component.extend({

  store: Ember.inject.service(),
  showAllStudents: false,
  showFindRecord: false,
  residencyModel: null,
  residencyIndex:null,
  genderModel: null,
  genderIndex:null,
  selectedResidency: null,
  selectedGender: null,
  selectedDate: null,
  studentsRecords: null,
  currentStudent: null,
  currentIndex: null,
  firstIndex: 0,
  lastIndex: 0,
  studentPhoto: null,
  limit: null,
  offset: null,
  pageSize: null,
  movingBackword: false,
  advancedStandingModel: null,
  currentASIndex:null,
  scholarshipAwardModel:null,
  currentScholIndex:null,
  endOfRecords: false,

  //undo
  //the stack store the data
  undoStack: Ember.A(),
  //the stack store the action name, e.g. student,name...
  undoNameStack:Ember.A(),
  //temp data shown on the main page, these should not be bind with the currentStudent, thus currentStudent value will not change unless saved
  tempFN: null,
  tempLN:null,
  tempPhoto:null,
  tempNumber:null,
  //tempRest:null,
  tempRegistrationComments:null,
  tempBasisOfAdmission:null,
  tempAdmissionAverage:null,
  tempAdmissionComments:null,
  tempAdvInfo:null,
  //tempGenderInfo:null,
  tempScholInfo:null,


  //advanced standing
  listAS: Ember.A(),
  courseNameAS: null,
  descriptionAS: null,
  unitsAS: null,
  gradeAS: null,
  fromAS: null,
  newRecordTempAS: null,

  //scholarship and awards
  scholarShipAndAwardList: null,
  scholarshipAndAwardNote: null,

  searchResultTitle: null,
  findStudentNumber: null,
  findStudentFirstName: null,
  findStudentLastName: null,
  studentRecordResults: null,

  tabInfoText: "Basic Info",
  addStudentStyles: "",

  addingStudent: false,
  backToBasicInfo: true,
  scholarshipTabIsDisabled: false,
  advancedstandingTabIsDisabled: false,


  //students high school record
  currentStudentHSGrades: null,



  studentModel: Ember.observer('offset', function () { //observes the offset variable. When it changes run code.
    var self = this;
    this.get('store').query('student', {
      limit: self.get('limit'),
      offset: self.get('offset')
    }).then(function (records) {

      if(records.get('length') > 0){

        self.set('studentsRecords', records);
        //console.log(this.get('studentsRecords').objectAt(2).get('resInfo'));
        self.set('firstIndex', records.indexOf(records.get("firstObject")));
        self.set('lastIndex', records.indexOf(records.get("lastObject")));
        if (self.get('movingBackword')) {
          self.set('currentIndex', records.indexOf(records.get("lastObject")));
        } else {
          self.set('currentIndex', records.indexOf(records.get("firstObject")));
        }
      }
      else{
        self.set('endOfRecords', true);
      }
    });
  }),

  fetchStudent: Ember.observer('currentIndex', function () {  //observes changes to the index
    this.showStudentData(this.get('currentIndex'));           //calls function showStudentData with current index
  }),

  init() {
    this._super(...arguments);
    // load Residency data model
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
    });

    // load advanced standing model
    this.get('store').findAll('advanced-standing').then(function (records) {
      self.set('advancedStandingModel', records);
      console.log(Ember.inspect(records));
    });

    //load scholarship Award model
    this.get('store').findAll('scholarship-award').then(function (records) {
      self.set('scholarshipAwardModel', records);
      console.log(Ember.inspect(records));
    });

    this.get('store').findAll('gender').then(function(records){
      self.set('genderModel', records);



    });

    // load first page of the students records
    this.set('limit', 10);
    this.set('offset', 0);
    this.set('pageSize', 10);
    var self = this;
    this.get('store').query('student', {
      limit: self.get('limit'),
      offset: self.get('offset')
    }).then(function (records) {
      self.set('studentsRecords', records);
      self.set('firstIndex', records.indexOf(records.get("firstObject")));
      self.set('lastIndex', records.indexOf(records.get("lastObject")));

      // Show first student data
      self.set('currentIndex', self.get('firstIndex'));
    });

  },

  showStudentData: function (index) {
    this.set('currentStudent', this.get('studentsRecords').objectAt(index));
    this.set('studentPhoto', this.get('currentStudent').get('photo'));
    var date = this.get('currentStudent').get('DOB');
    var datestring = date.toISOString().substring(0, 10);
    this.set('selectedDate', datestring);
    var gender = this.get('currentStudent').get('genderInfo');

    this.set('currentStudentHSGrades', this.get('currentStudent').get('hsCourseGrade'));

    this.set('selectedGender',gender);
    var res = this.get('currentStudent').get('resInfo');
    this.set('selectedResidency',res);

    this.get('store').query('advanced-standing',{filter:{studentInfo:this.get('currentStudent').get('id')}});
    this.set('listAS', this.get('currentStudent').get('advInfo'));

    this.get('store').query('scholarship-award',{filter:{studentInfo:this.get('currentStudent').get('id')}});
    this.set('scholarShipAndAwardList', this.get('currentStudent').get('scholInfo'));




    console.log(this.get('scholarShipAndAwardList'));

  },

  didRender() {
    Ember.$('.menu .item').tab();
  },

  //the observer function for the currentStudent, it will update the tmpValue shown on the page on change
  currentStudentChanged:function(){
    //a ref to current student
    var studenthold = this.get('currentStudent');

    var studentFN = studenthold.get('firstName');
    var studentLN = studenthold.get('lastName');
    var studentNumber = studenthold.get('number');
    var studentPhoto = studenthold.get('photo');
    //var studentRest = studenthold.get('resInfo');
    var studentRegistrationComments = studenthold.get('registrationComments');
    var studentBasisOfAdmission = studenthold.get('basisOfAdmission');
    var studentAdmissionAverage = studenthold.get('admissionAverage');
    var studentAdmissionComments = studenthold.get('admissionComments');
    var studentAdvInfo = studenthold.get('advInfo');
    //var studentGenderInfo = studenthold.get('genderInfo');
    var studentScholInfo = studenthold.get('scholInfo');
    this.set('tempFN',studentFN);
    this.set('tempLN',studentLN);
    this.set('tempNumber',studentNumber);
    this.set('tempPhoto',studentPhoto);
    //this.set('tempRest',studentRest);
    this.set('tempRegistrationComments',studentRegistrationComments);
    this.set('tempBasisOfAdmission',studentBasisOfAdmission);
    this.set('tempAdmissionAverage',studentAdmissionAverage);
    this.set('tempAdmissionComments',studentAdmissionComments);
    this.set('tempAdvInfo',studentAdvInfo);
    //this.set('tempGenderInfo',studentGenderInfo);
    this.set('tempScholInfo',studentScholInfo);
  }.observes('currentStudent'),

  addCurrentStudentToStack()
  {
    var studenthold = this.get('currentStudent');

    var studentFN = studenthold.get('firstName');
    var studentLN = studenthold.get('lastName');
    var studentNumber = studenthold.get('number');
    var dob = studenthold.get('DOB');
    var studentPhoto = studenthold.get('photo');
    var studentRest = studenthold.get('resInfo');
    var studentRegistrationComments = studenthold.get('registrationComments');
    var studentBasisOfAdmission = studenthold.get('basisOfAdmission');
    var studentAdmissionAverage = studenthold.get('admissionAverage');
    var studentAdmissionComments = studenthold.get('admissionComments');
    var studentAdvInfo = studenthold.get('advInfo');
    var studentGenderInfo = studenthold.get('genderInfo');
    var studentScholInfo = studenthold.get('scholInfo');

    //push the unchanged infomation to undo stack
    this.get('undoNameStack').pushObject("save");
    this.get('undoStack').pushObject(studentFN);
    this.get('undoStack').pushObject(studentLN);
    this.get('undoStack').pushObject(studentNumber);
    this.get('undoStack').pushObject(dob);
    this.get('undoStack').pushObject(studentPhoto);
    this.get('undoStack').pushObject(studentRest);
    this.get('undoStack').pushObject(studentRegistrationComments);
    this.get('undoStack').pushObject(studentBasisOfAdmission);
    this.get('undoStack').pushObject(studentAdmissionAverage);
    this.get('undoStack').pushObject(studentAdmissionComments);
    this.get('undoStack').pushObject(studentAdvInfo);
    this.get('undoStack').pushObject(studentGenderInfo);
    this.get('undoStack').pushObject(studentScholInfo);
  },

  actions: {

    //undo function
    undoSave(){

      var category = this.get('undoNameStack').popObject();
      if(category === "number")
      {
        var number = this.get('undoStack').popObject();
        this.set('tempNumber',number);
      }
      else if (category === "firstName")
      {
        var fn = this.get('undoStack').popObject();
        this.set('tempFN',fn);
      }
      else if (category === "lastName")
      {
        var ln = this.get('undoStack').popObject();
        this.set('tempLN',ln);
      }
      else if (category === "genderInfo")
      {
        var gender = this.get('undoStack').popObject();
        console.log(gender);
        this.set('selectedGender',gender);
      }
      else if (category === "DOB")
      {
        var studentdob = this.get('undoStack').popObject();
        var datestring = studentdob.toISOString().substring(0, 10);
        this.set('selectedDate',datestring);
      }
      else if (category === "resInfo")
      {
        var res = this.get('undoStack').popObject();
        this.set('selectedResidency', res);
      }
      else if (category === "basisOfAdmission")
      {
        var boa = this.get('undoStack').popObject();
        this.set('tempBasisOfAdmission',boa);
      }
      else if (category === "admissionAverage")
      {
        var aa = this.get('undoStack').popObject();
        this.set('tempAdmissionAverage', aa);
      }
      else if (category === "admissionComments")
      {
        var ac = this.get('undoStack').popObject();
        this.set('tempAdmissionComments',ac);
      }
      else if (category === "registrationComments")
      {
        var rc = this.get('undoStack').popObject();
        this.set('tempRegistrationComments',rc);
      }
      else if(category === "save")
      {
        var studentScholInfo =this.get('undoStack').popObject();
        var studentGenderInfo =this.get('undoStack').popObject();
        var studentAdvInfo =this.get('undoStack').popObject();
        var studentAdmissionComments =this.get('undoStack').popObject();
        var studentAdmissionAverage =this.get('undoStack').popObject();
        var studentBasisOfAdmission =this.get('undoStack').popObject();
        var studentRegistrationComments =this.get('undoStack').popObject();
        var studentRest =this.get('undoStack').popObject();
        var studentPhoto =this.get('undoStack').popObject();
        var dob =this.get('undoStack').popObject();
        var studentNumber =this.get('undoStack').popObject();
        var studentLN =this.get('undoStack').popObject();
        var studentFN =this.get('undoStack').popObject();


        //set the currentvalue according to the reference and save it
        var studenthold = this.get('currentStudent');

        studenthold.set('number',studentNumber);
        studenthold.set('firstName',studentFN);
        studenthold.set('lastName',studentLN);
        studenthold.set('DOB',dob);
        studenthold.set('photo',studentPhoto);
        studenthold.set('resInfo',studentRest);
        studenthold.set('registrationComments',studentRegistrationComments);
        studenthold.set('basisOfAdmission',studentBasisOfAdmission);
        studenthold.set('admissionAverage',studentAdmissionAverage);
        studenthold.set('admissionComments',studentAdmissionComments);
        studenthold.set('advInfo',studentAdvInfo);
        studenthold.set('genderInfo',studentGenderInfo);
        studenthold.set('scholInfo',studentScholInfo);

        studenthold.save().then(() => {
          //     this.set('isStudentFormEditing', false);
        });

        //update the tempdata shown on the screen, it should auto update since it's observe the current data...
        //but for some reason the update is not complete, have to mannually update

        //dob string
        var studentDOB = dob.toISOString().substring(0, 10);
        this.set('selectedDate',studentDOB);
        this.set('tempFN',studentFN);
        this.set('tempLN',studentLN);
        this.set('tempNumber',studentNumber);
        this.set('tempPhoto',studentPhoto);
        this.set('tempRegistrationComments',studentRegistrationComments);
        this.set('tempBasisOfAdmission',studentBasisOfAdmission);
        this.set('tempAdmissionAverage',studentAdmissionAverage);
        this.set('tempAdmissionComments',studentAdmissionComments);
        this.set('tempAdvInfo',studentAdvInfo);
        this.set('tempScholInfo',studentScholInfo);
      }
    },
    //functions used for undo function
    //function get called when the focus leave the student number save the value into stack
    studentNumberStack(){
      this.get('undoNameStack').pushObject("number");
      var tempstudentnumber = this.get('currentStudent').get('number');
      this.get('undoStack').pushObject(tempstudentnumber);
    },

    //function get called when the focus leave the student first name save the value into stack
    studentFNStack(){
      console.log(1);
      this.get('undoNameStack').pushObject("firstName");
      var tempstudent = this.get('currentStudent').get('firstName');
      this.get('undoStack').pushObject(tempstudent);
    },

    //function get called when the focus leave the student last name save the value into stack
    studentLNStack(){
      console.log(1);
      this.get('undoNameStack').pushObject("lastName");
      var tempstudent = this.get('currentStudent').get('lastName');
      this.get('undoStack').pushObject(tempstudent);
    },

    //function get called when the focus leave the student basis of admission save the value into stack
    studentBOAStack(){
      console.log(1);
      this.get('undoNameStack').pushObject("basisOfAdmission");
      var tempstudent = this.get('currentStudent').get('basisOfAdmission');
      this.get('undoStack').pushObject(tempstudent);
    },

    //function get called when the focus leave the student admission average save the value into stack
    studentAAStack(){
      console.log(1);
      this.get('undoNameStack').pushObject("admissionAverage");
      var tempstudent = this.get('currentStudent').get('admissionAverage');
      this.get('undoStack').pushObject(tempstudent);
    },

    //function get called when the focus leave the student admission comment save the value into stack
    studentACStack(){
      console.log(1);
      this.get('undoNameStack').pushObject("admissionComments");
      var tempstudent = this.get('currentStudent').get('admissionComments');
      this.get('undoStack').pushObject(tempstudent);
    },

    //function get called when the focus leave the student registration comments save the value into stack
    studentRCStack(){
      console.log(1);
      this.get('undoNameStack').pushObject("registrationComments");
      var tempstudent = this.get('currentStudent').get('registrationComments');
      this.get('undoStack').pushObject(tempstudent);
    },


    saveStudent () {

      var studenthold = this.get('currentStudent');

      var studentFN = studenthold.get('firstName');
      var studentLN = studenthold.get('lastName');
      var studentNumber = studenthold.get('number');
      var dob = studenthold.get('DOB');
      var studentPhoto = studenthold.get('photo');
      var studentRest = studenthold.get('resInfo');
      var studentRegistrationComments = studenthold.get('registrationComments');
      var studentBasisOfAdmission = studenthold.get('basisOfAdmission');
      var studentAdmissionAverage = studenthold.get('admissionAverage');
      var studentAdmissionComments = studenthold.get('admissionComments');
      var studentAdvInfo = studenthold.get('advInfo');
      var studentGenderInfo = studenthold.get('genderInfo');
      var studentScholInfo = studenthold.get('scholInfo');

      //push the unchanged infomation to undo stack
      this.get('undoNameStack').pushObject("save");
      this.get('undoStack').pushObject(studentFN);
      this.get('undoStack').pushObject(studentLN);
      this.get('undoStack').pushObject(studentNumber);
      this.get('undoStack').pushObject(dob);
      this.get('undoStack').pushObject(studentPhoto);
      this.get('undoStack').pushObject(studentRest);
      this.get('undoStack').pushObject(studentRegistrationComments);
      this.get('undoStack').pushObject(studentBasisOfAdmission);
      this.get('undoStack').pushObject(studentAdmissionAverage);
      this.get('undoStack').pushObject(studentAdmissionComments);
      this.get('undoStack').pushObject(studentAdvInfo);
      this.get('undoStack').pushObject(studentGenderInfo);
      this.get('undoStack').pushObject(studentScholInfo);

      //update the current student according to the temp value and save it

      var updatestudentnumebr = this.get('tempNumber');
      var updatestudentFN = this.get('tempFN');
      var updatestudentLN = this.get('tempLN');
      var updatestudentPhoto = this.get('tempPhoto');
      var updatestudentRegistrationComments = this.get('tempRegistrationComments');
      var updatestudentBasisOfAdmission = this.get('tempBasisOfAdmission');
      var updatestudentAdmissionAverage = this.get('tempAdmissionAverage');
      var updatestudentAdmissionComments = this.get('tempAdmissionComments');
      var updatestudentAdvInfo = this.get('tempAdvInfo');
      var updatestudentScholInfo = this.get('tempScholInfo');

      //set the current student value to the front end temp value
      studenthold.set('firstName',updatestudentFN);
      studenthold.set('lastName',updatestudentLN);
      studenthold.set('number',updatestudentnumebr);
      studenthold.set('photo',updatestudentPhoto);
      studenthold.set('registrationComments',updatestudentRegistrationComments);
      studenthold.set('basisOfAdmission',updatestudentBasisOfAdmission);
      studenthold.set('admissionAverage',updatestudentAdmissionAverage);
      studenthold.set('admissionComments',updatestudentAdmissionComments);
      studenthold.set('advInfo',updatestudentAdvInfo);
      studenthold.set('scholInfo',updatestudentScholInfo);
      var res = this.get('store').peekRecord('residency', this.get('selectedResidency'));
      var gen = this.get('store').peekRecord('gender', this.get('selectedGender'));
      if (gen != null) {
        studenthold.set('genderInfo', gen);
      }
      studenthold.set('DOB', new Date(this.get('selectedDate')));
      if (res != null) {
        studenthold.set('resInfo', res);
      }
      studenthold.save().then(() => {
        //     this.set('isStudentFormEditing', false);
      });

    },

    firstStudent() {
      this.set('currentIndex', this.get('firstIndex'));
    },

    nextStudent() {
      this.set('movingBackword' , false);
      if (this.get('currentIndex') < this.get('lastIndex')) {
        this.set('currentIndex', this.get('currentIndex') + 1);
      }
      else {
        this.set('offset', this.get('offset') + this.get('pageSize'));
      }
    },
    findStudent() {
      this.set('showFindRecord', true);
      this.set('findStudentNumber', null);
      this.set('findStudentFirstName', null);
      this.set('findStudentLastName', null);
      this.set('studentRecordResults', null);
      this.set('searchResultTitle', null);
    },
    previousStudent() {
      this.set('movingBackword' , true);
      if (this.get('currentIndex') > 0) {
        this.set('currentIndex', this.get('currentIndex') - 1);
      }
      else if (this.get('offset') > 0) {
        this.set('offset', this.get('offset') - this.get('pageSize'));
      }
    },

    lastStudent() {
      this.set('currentIndex', this.get('lastIndex'));
    },

    allStudents() {
      this.set('showAllStudents', true);
      this.set('offset', 0);
      this.set('endOfRecords', false);
    },

    deleteStudent(){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        this.get('currentStudent').deleteRecord();
        this.get('currentStudent').save();

        this.set('movingBackword', true);
        if (this.get("currentIndex") === this.get("firstIndex")) {
          this.set('movingBackword', false);
          this.set('currentIndex', this.get('currentIndex') + 1);
        }
        else if (this.get('currentIndex') > 0) {
          this.set('currentIndex', this.get('currentIndex') - 1);
        }
        else if (this.get('offset') > 0) {
          this.set('offset', this.get('offset') - this.get('pageSize'));
        }
      }

    },

    allStudentsPrev(){
      if (this.get('offset') >= this.get('pageSize')) {
        this.set('offset', this.get('offset') - this.get('pageSize'));
        this.set('endOfRecords', false);
      }
    },

    allStudentsNext(){
      if(this.get('endOfRecords') === false){
        this.set('offset', this.get('offset') + this.get('pageSize'));
      }
    },

    addStudent(){
      //validates that the fields entered are correct
      if (validateFields(this.get('tempNumber'), this.get('tempFN'), this.get('tempLN'), this.get('selectedDate'), this.get('selectedResidency'),this.get('selectedGender'))) {


        var res = this.get('store').peekRecord('residency', this.get('selectedResidency')); //get the students residency object
        var gen = this.get('store').peekRecord('gender', this.get('selectedGender')); //get the students gender object

        console.log(this.get('basisOfAdmissionInput'));
        console.log(this.get('admissionAvg'));
        console.log(this.get('admissionComment'));
        console.log(this.get('regComment'));

        var newStudent = this.get('store').createRecord('student', { //create a new student record
          number: this.get('tempNumber'),
          firstName: this.get('tempFN'),
          lastName: this.get('tempLN'),
          DOB: new Date(this.get('selectedDate')),
          photo: this.get('photoPath'),
          registrationComments: this.get('tempRegistrationComments'),
          basisOfAdmission: this.get('tempBasisOfAdmission'),
          admissionAverage: this.get('tempAdmissionAverage'),
          admissionComments: this.get('tempAdmissionComments'),
          resInfo: res,
          genderInfo: gen,
        });
        newStudent.save(); //commit the student record to db

        alert("Student successfully added");

        this.set('currentStudent', newStudent);
        var gender = this.get('currentStudent').get('genderInfo');
        this.set('selectedGender',gender);
        var res1 = this.get('currentStudent').get('resInfo');
        this.set('selectedResidency',res1);

        this.set('addingStudent', false);
        this.set('scholarshipTabIsDisabled', false);
        this.set('advancedstandingTabIsDisabled', false);
        this.set('addStudentStyles', "");
        this.set('tabInfoText', "Basic Info");
        this.set('backToBasicInfo', true);
        this.set('endOfRecords', false);
      }//end if

    },

    goToAddStudent(){
      this.set('scholarshipTabIsDisabled', true);
      this.set('advancedstandingTabIsDisabled', true);
      this.set('addStudentStyles', "pointer-events: none;");
      this.set('tabInfoText', "Add Student");
      this.set('backToBasicInfo', true);
      this.set('addingStudent', true);

      this.set('listAS', null);
      this.set('scholarShipAndAwardList', null);

      this.set('tempNumber', null);
      this.set('tempFN', null);
      this.set('tempLN', null);
      this.set('selectedDate', null);
      this.set('tempBasisOfAdmission', null);
      this.set('tempAdmissionAverage', null);
      this.set('tempAdmissionComments', null);
      this.set('tempRegistrationComments', null);

    },


    selectGender (gender){
      this.set('selectedGender', gender);
      console.log(gender);
      console.log(1);
      //push the currentStudent gender into stack
      this.get('undoNameStack').pushObject("genderInfo");
      var tempstudent = this.get('currentStudent').get('genderInfo');
      this.get('undoStack').pushObject(tempstudent);
    },

    selectResidency (residency){
      this.set('selectedResidency', residency);
      console.log(residency);
      //push the orignal one into the stack
      this.get('undoNameStack').pushObject("resInfo");
      var tempstudent = this.get('currentStudent').get('resInfo');
      this.get('undoStack').pushObject(tempstudent);
    },

    assignDate (date){
      this.set('selectedDate', date);
      //push the original dob from the current student to undo stack
      console.log(1);
      this.get('undoNameStack').pushObject("DOB");
      var tempstudent = this.get('currentStudent').get('DOB');
      this.get('undoStack').pushObject(tempstudent);
    },

    addAS(){
      console.log(this.get('courseNameAS'));
      console.log(this.get('descriptionAS'));
      console.log(this.get('unitsAS'));
      console.log(this.get('gradeAS'));
      console.log(this.get('fromAS'));

      var newASRecord = this.get('store').createRecord('advanced-standing', {
        course: this.get('courseNameAS'),
        description: this.get('descriptionAS'),
        units: this.get('unitsAS'),
        grade: this.get('gradeAS'),
        from: this.get('fromAS'),
        studentInfo: this.get('currentStudent'),
      });
      newASRecord.save();

    },

    deleteAS(currentAS){
      var index = this.get('advancedStandingModel').indexOf(currentAS);
      this.set('currentASIndex', index);
      var indextemp = this.get('currentASIndex');
      var temp = this.get('advancedStandingModel').objectAt(indextemp);
      console.log(temp);
      temp.deleteRecord();
      temp.save();
    },

    deleteScholarshipAward(scholAward){
      var index = this.get('scholarshipAwardModel').indexOf(scholAward);
      this.set('currentScholIndex', index);
      var indextemp = this.get('currentScholIndex');
      var temp = this.get('scholarshipAwardModel').objectAt(indextemp);
      console.log(temp);
      temp.deleteRecord();
      temp.save();
    },

    addScholarShipAndAward(){
      console.log(this.get('scholarshipAndAwardNote'));

      var newScholarShipAndAward = this.get('store').createRecord('scholarship-award',{
        note: this.get('scholarshipAndAwardNote'),
        studentInfo: this.get('currentStudent'),
      });
      newScholarShipAndAward.save();

      this.set('scholarshipAndAwardNote', null);
    },

    backToEntryForm(){
      this.set('addingStudent', false);
      this.set('scholarshipTabIsDisabled', false);
      this.set('advancedstandingTabIsDisabled', false);
      this.set('addStudentStyles', "");
      this.set('tabInfoText', "Basic Info");
      this.set('backToBasicInfo', true);
      this.set('showFindRecord', false);
      this.set('showAllStudents', false);

      this.set('tempFN',this.get('currentStudent').get('firstName'));
      this.set('tempLN',this.get('currentStudent').get('lastName'));
      this.set('tempNumber',this.get('currentStudent').get('number'));
      this.set('tempPhoto',this.get('currentStudent').get('photo'));
      this.set('tempRegistrationComments',this.get('currentStudent').get('registrationComments'));
      this.set('tempBasisOfAdmission',this.get('currentStudent').get('basisOfAdmission'));
      this.set('tempAdmissionAverage',this.get('currentStudent').get('admissionAverage'));
      this.set('tempAdmissionComments',this.get('currentStudent').get('admissionComments'));
      this.set('tempAdvInfo',this.get('currentStudent').get('advInfo'));
      this.set('tempScholInfo',this.get('currentStudent').get('scholInfo'));
      this.set('selectedDate', this.get('currentStudent').get('DOB').toISOString().substring(0, 10));

      var gender = this.get('currentStudent').get('genderInfo');
      this.set('selectedGender',gender);
      var res = this.get('currentStudent').get('resInfo');
      this.set('selectedResidency',res);

      this.set('listAS', this.get('currentStudent').get('advInfo'));
      this.set('scholarShipAndAwardList', this.get('currentStudent').get('scholInfo'));



    },

    findRecord(){     //-----------------------------------------------------------------finds the student record-------------------------------------------------
      var self = this;
      //console.log("student number find: " + self.get('findStudentNumber'));


      this.get('store').query('student', {
        findStudentNum: self.get('findStudentNumber'),
        findStudentFirstName: self.get('findStudentFirstName'),
        findStudentLastName: self.get('findStudentLastName')
      }).then(function (students) {
        //  console.log(students.objectAt(0).get('firstName'));
        self.set('studentRecordResults', students);
      });

      this.set('searchResultTitle', "Search Results");

    },

    goToRecord(studentRecord){ //---------------------------------------------go to the found record ---------------------------------------------------
      console.log("clicked: " + studentRecord.get('firstName'));
      this.set('currentStudent', studentRecord);
      this.set('studentPhoto', this.get('currentStudent').get('photo'));
      var date = this.get('currentStudent').get('DOB');
      var datestring = date.toISOString().substring(0, 10);
      this.set('selectedDate', datestring);
      this.set('tempAdmissionAverage', this.get('currentStudent').get('admissionAverage'));
      this.set('tempRegistrationComments', this.get('currentStudent').get('registrationComments'));
      this.set('tempBasisOfAdmission', this.get('currentStudent').get('basisOfAdmission'));
      this.set('tempAdmissionComments', this.get('currentStudent').get('admissionComments'));

      this.get('store').query('advanced-standing',{filter:{studentInfo:this.get('currentStudent').get('id')}});
      this.set('listAS', this.get('currentStudent').get('advInfo'));

      this.get('store').query('scholarship-award',{filter:{studentInfo:this.get('currentStudent').get('id')}});
      this.set('scholarShipAndAwardList', this.get('currentStudent').get('scholInfo'));

      var gender = this.get('currentStudent').get('genderInfo');
      this.set('selectedGender',gender);
      var res = this.get('currentStudent').get('resInfo');
      this.set('selectedResidency',res);

      this.set('showFindRecord', false);
      this.set('showAllStudents', false);

    },
  }

});


function validateFields(_studentNum, _fName, _lName, _dob, _residency, _gender) { //validates all the fields

  //validates the student number field
  if (_studentNum === null || _studentNum === undefined || _studentNum.length < 9 || _studentNum.length > 9) {
    alert("Student number must be 9 digits");
    return false;
  }

  //validates the first name field
  if (_fName === null || _fName === undefined || _fName.length === 0) {
    alert("First name field is empty");
    return false;
  }

  //validates the last name field
  if (_lName === null || _lName === undefined || _lName.length === 0) {
    alert("Last name field is empty");
    return false;
  }

  //validates the date of birth field
  if (_dob === null || _dob === undefined) {
    alert("Date of birth field is empty");
    return false;
  }

  //validates the residency field
  if (_residency === null || _residency === undefined) {
    alert("Must select a residence");
    return false;
  }

  //validates the gender field
  if (_gender === null || _gender === undefined){
    alert('Must select a gender');
    return false;
  }

  return true;

}//end validateFields


Ember.$(document).ready(function () {
  Ember.$("#dateInput").on("change keypress", function (event) { //only allows numbers to be inputed
    var asciiCode = event.which;
    console.log(asciiCode);

    if (asciiCode < 48 || asciiCode > 57) {
      return false;
    }

    if (Ember.$("#dateInput").val().length === 4 && asciiCode !== 8) { //adds dashes to date field to force correct format
      Ember.$("#dateInput").val(Ember.$("#dateInput").val() + "-");
    }
    if (Ember.$("#dateInput").val().length === 7 && asciiCode !== 8) {
      Ember.$("#dateInput").val(Ember.$("#dateInput").val() + "-");
    }

  });

}); //end ember.$document function
