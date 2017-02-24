import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

//these are for adding plan codes
  planCode: null,
  planCodeModel: null,

//these are for adding term codes
  termCode: null,
  termCodeModel: null,

//these are for adding course info
  courseLetter: null,
  courseNum: null,
  courseName: null,
  courseUnit: null,
  courseCodeModel: null,

//these are for adding program records
  programRecordName: null,
  programRecordLevel: null,
  programRecordLoad: null,
  programRecordStatus: null,
  programRecordModel: null,
  programRecordPlanCode: Ember.A(), //holds a list of plan codes
  planCodeTemp: null,               //holds a plan code that will be added to the array
  programRecordTermCode: Ember.A(), //holds a list of term codes
  termCodeTemp: null,               //holds a term code that will be added to the array
  programRecordCourseCode: null,




  init() {

    this._super(...arguments);

    var self = this;

    this.get('store').findAll('plan-code').then(function (records) { //gets all the plan codes
      self.set('planCodeModel', records);
    });

    this.get('store').findAll('term-code').then(function (records) { //gets all the term codes
      self.set('termCodeModel', records);
    });

    this.get('store').findAll('course-code').then(function (records) { //gets all the course codes
      self.set('courseCodeModel', records);
    });

    this.get('store').findAll('program-record').then(function (records) { //gets all the program records
      self.set('programRecordModel', records);
    });

  },

  actions: {

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
          semester: this.get('programRecordTermCode'),
          //plan code is a many to many relation, currently not sure if this correct
          plan: this.get('programRecordPlanCode'),
        });
        newPgRecord.save();
        console.log(this.get('programRecordPlanCode').get('length'));
      }
      else{
        alert("Not are all fields are filled in");
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
    //  console.log(this.get('planCodeTemp'));
    },
    selectTermCode(termCode){
      var termCodeObj = this.get('store').peekRecord('term-code', termCode);
      this.set('termCodeTemp', termCodeObj);
    },
    selectCourseCode(courseCode){
      this.set('programRecordCourseCode', courseCode);
    },

    addToPlanCodeArray(){
      this.get('programRecordPlanCode').pushObject(this.get('planCodeTemp'));
    },

    deleteFromPlanCodeArray(planCode){
      this.get('programRecordPlanCode').removeObject(planCode);

    },
    addToTermCodeArray(){
      this.get('programRecordTermCode').pushObject(this.get('termCodeTemp'));
    },

    deleteFromTermCodeArray(termCode){
      this.get('programRecordTermCode').removeObject(termCode);
    }

  }//end actions
});
