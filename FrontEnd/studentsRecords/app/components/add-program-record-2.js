import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  planCode: null,
  planCodeModel: null,

  termCode: null,
  termCodeModel: null,

  courseLetter: null,
  courseNum: null,
  courseName: null,
  courseUnit: null,
  courseCodeModel: null,

  programRecordName: null,
  programRecordLevel: null,
  programRecordLoad: null,
  programRecordStatus: null,
  programRecordModel: null,
  programRecordPlanCode: Ember.A([]),
  planCodeTemp: null,
  programRecordTermCode: null,
  programRecordCourseCode: null,


  init() {

    this._super(...arguments);

    var self = this;

    this.get('store').findAll('plan-code').then(function (records) {
      self.set('planCodeModel', records);
    });

    this.get('store').findAll('term-code').then(function (records) {
      self.set('termCodeModel', records);
    });

    this.get('store').findAll('course-code').then(function (records) {
      self.set('courseCodeModel', records);
    });

    this.get('store').findAll('program-record').then(function (records) {
      self.set('programRecordModel', records);
    });

  },

  actions: {
    //Add a grade
    addGrade(){
      var newGrade = this.get('store').createRecord('hscourse-grade', {
        mark: this.get('gradeMark'),
        note: this.get('gradeNote'),
        studentInfo: this.get('studentInfo'),
        programRecordInfo: this.get('programRecordInfo'),
      });
      newGrade.save();
    },
    //Add a plan code
    addPlanCode(){
      console.log(this.get('planCode'));
      var newPlanCode = this.get('store').createRecord('plan-code', {
        name: this.get('planCode'),
      });
      newPlanCode.save();
    },
    //Add a new course
    addCourseCode(){
      var newCourseCode = this.get('store').createRecord('course-code', {
        courseLetter: this.get('courseLetter'),
        courseNumber: this.get('courseNum'),
        name: this.get('courseName'),
        unit: this.get('courseUnit'),
      });
      newCourseCode.save();
    },

    //Add a term code
    addTermCode(){
      var newTermCode = this.get('store').createRecord('term-code', {
        name: this.get('termCode'),
      });
      newTermCode.save();
    },

    //Add a program record
    addProgramRecord(){
      if(this.get('programRecordPlanCode') !== null && this.get('programRecordCourseCode') !== null && this.get('programRecordTermCode') !== null){
        var newPgRecord = this.get('store').createRecord('program-record', {
          name: this.get('programRecordName'),
          level: this.get('programRecordLevel'),
          load: this.get('programRecordLoad'),
          status: this.get('programRecordStatus'),
          courseCodeInfo: this.get('programRecordCourseCode'),
          termCodeInfo: this.get('programRecordTermCode'),
          //plan code is a many to many relation, currently not sure if this correct
          planCodeInfo: this.get('programRecordPlanCode'),
        });
        newPgRecord.save();
        console.log(this.get('programRecordPlanCode').get('length'));
      }
      else{
        alert("Not are all fields are filled in");
      }
    },
    //Delete a grade
    deleteGrade(grade){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('gradeModel').indexOf(grade);
        this.set('gradeIndex', index);
        var indextemp = this.get('gradeIndex');
        var restemp = this.get('gradeModel').objectAt(indextemp);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    //Delete a term code
    deleteTermCode(termcode){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('termCodeModel').indexOf(termcode);
        var restemp = this.get('termCodeModel').objectAt(index);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },
    //Delete a plan code
    deletePlanCode(plancode){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('planCodeModel').indexOf(plancode);
        var restemp = this.get('planCodeModel').objectAt(index);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    //Delete a course code
    deleteCourseCode(coursecode){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('courseCodeModel').indexOf(coursecode);
        var restemp = this.get('courseCodeModel').objectAt(index);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    //Delete a program record
    deleteProgramRecord(programRecord){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('programRecordModel').indexOf(programRecord);
        var restemp = this.get('programRecordModel').objectAt(index);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    selectPlanCode(planCode){
      var planCodeObj = this.get('store').peekRecord('plan-code', planCode);
      this.set('planCodeTemp', planCodeObj);
      console.log(this.get('planCodeTemp'));
    },
    selectTermCode(termCode){
      this.set('programRecordTermCode', termCode);
    },
    selectCourseCode(courseCode){
      this.set('programRecordCourseCode', courseCode);
    },

    addToPlanCodeArray(){
      this.get('programRecordPlanCode').push(this.get('planCodeTemp'));

      for(var i = 0; i < this.get('programRecordPlanCode').length; i++){
        console.log((this.get('programRecordPlanCode')[i]).get('name'));
      }
    }

  }
});
