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
  termCodeCourseTemp: null,
  programRecordCourseCode: null,

  planCodeToEdit: null,
  planCodeNameEdit:null,

  termCodeToEdit: null,
  termCodeNameEdit: null,

  programRecordToEdit: null,
  PRNameEdit:null,
  PRLevelEdit: null,
  PRLoadEdit: null,
  PRStatusEdit: null,
  PRPlanEdit: null,

  planCodeEditTemp: null,




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

  didRender() {
    Ember.$('.menu .item').tab();
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
        semester: this.get('termCodeCourseTemp'),
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
      if(this.get('programRecordPlanCode') !== null){
        var newPgRecord = this.get('store').createRecord('program-record', {
          name: this.get('programRecordName'),
          level: this.get('programRecordLevel'),
          load: this.get('programRecordLoad'),
          status: this.get('programRecordStatus'),
          semester: this.get('programRecordTermCode'),
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

    selectTermCodeForAddCourse(termCode){
      var termCodeCourseObj = this.get('store').peekRecord('term-code', termCode);
      this.set('termCodeCourseTemp', termCodeCourseObj);
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
    },

    editPlanCode(){
      var planCode = this.get('planCodeToEdit');
      planCode.set('name', this.get('planCodeNameEdit'));
      planCode.save();
    },
    editTermCode(){
      var termCode = this.get('termCodeToEdit');
      termCode.set('name', this.get('termCodeNameEdit'));
      termCode.save();
    },
    editProgramRecord(){

      var program = this.get('programRecordToEdit');
      program.set('name', this.get('PRNameEdit'));
      program.set('level', this.get('PRLevelEdit'));
      program.set('load', this.get('PRLoadEdit'));
      program.set('status', this.get('PRStatusEdit'));

      program.save();
    },




    openEditTermCodeForm(termCode){
      this.set('termCodeToEdit', termCode);
      this.set('termCodeNameEdit', termCode.get('name'));
      Ember.$('.ui.modal.termCodeEdit').modal({detachable: false,}).modal('show');
    },
    closeEditTermCodeForm(){
      Ember.$('.ui.modal.termCodeEdit').modal('hide');
    },





    openEditPlanCodeForm(planCode){
      this.set('planCodeToEdit', planCode);
      this.set('planCodeNameEdit', planCode.get('name'));
      console.log(this.get('planCodeToEdit'));
      Ember.$('.ui.modal.planCodeEdit').modal({detachable: false,}).modal('show');
    },

    closeEditPlanCodeForm(){
      Ember.$('.ui.modal.planCodeEdit').modal('hide');
    },

    selectPlanCodeEdit(planCode){
      var planCodeFound = this.get('store').peekRecord('plan-code', planCode);
      console.log(planCodeFound);
      this.set('planCodeEditTemp', planCodeFound);
    },




    openEditProgramRecordForm(programRecord){
      this.set('PRPlanEdit', null);
      this.set('programRecordToEdit', programRecord);
      this.set('PRNameEdit', programRecord.get('name'));
      this.set('PRLevelEdit', programRecord.get('level'));
      this.set('PRLoadEdit', programRecord.get('load'));
      this.set('PRStatusEdit', programRecord.get('status'));
      this.set('PRPlanEdit', programRecord.get('plan'));

      console.log(this.get('PRPlanEdit').get('length'));
      Ember.$('.ui.modal.programRecordEdit').modal({detachable: false,}).modal('show');
    },

    closeEditProgramRecordForm(){
      Ember.$('.ui.modal.programRecordEdit').modal('hide');
    },

    removePlanCodeEdit(planCode){
      console.log(planCode);
      this.get('PRPlanEdit').removeObject(planCode);
      console.log(this.get('PRPlanEdit').get('length'));
    },

    addPlanCodeEdit(){
      console.log(this.get('planCodeEditTemp'));
      this.get('PRPlanEdit').pushObject(this.get('planCodeEditTemp'));
      console.log(this.get('PRPlanEdit').get('length'));
    },



  }//end actions
});
