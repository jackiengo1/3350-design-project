import Ember from 'ember';

export default Ember.Component.extend({
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
      var newPlanCode = this.get('store').createRecord('plan-code', {
        name: this.get('planName'),
        programRecordInfo: this.get('programRecordInfo'),
      });
      newPlanCode.save();
    },
    //Add a new course
    addCourseCode(){
      var newCourseCode = this.get('store').createRecord('course-code', {
        courseLetter: this.get('courseLetter'),
        courseNumber: this.get('courseNumber'),
        name: this.get('courseName'),
        unit: this.get('courseUnit'),
        programRecordInfo: this.get('programRecordInfo'),
      });
      newCourseCode.save();
    },

    //Add a term code
    addTermCode(){
      var newTermCode = this.get('store').createRecord('term-code', {
        name: this.get('termName'),
        programRecordInfo: this.get('programRecordInfo'),
      });
      newTermCode.save();
    },

    //Add a program record
    addProgramRecord(){
      var newPgRecord = this.get('store').createRecord('program-record', {
        name: this.get('programRecordName'),
        level: this.get('programRecordLevel'),
        load: this.get('programRecordLoad'),
        status: this.get('programRecordStatus'),
        gradeInfo: this.get('programRecordGradeInfo'),
        courseCodeInfo: this.get('courseCodeInfo'),
        termCodeInfo: this.get('termCodeInfo'),
//plan code is a many to many relation, currently not sure if this correct
        planCodeInfo: this.get('planCodeInfo'),
      });
      newPgRecord.save();
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
        this.set('termCodeIndex', index);
        var indextemp = this.get('termCodeIndex');
        var restemp = this.get('termCodeModel').objectAt(indextemp);
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
        this.set('planCodeIndex', index);
        var indextemp = this.get('planCodeIndex');
        var restemp = this.get('planCodeModel').objectAt(indextemp);
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
        this.set('courseCodeIndex', index);
        var indextemp = this.get('courseCodeIndex');
        var restemp = this.get('courseCodeModel').objectAt(indextemp);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    //Delete a program record
    deleteProgamRecord(programrecord){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('programrecordModel').indexOf(programrecord);
        this.set('programrecordIndex', index);
        var indextemp = this.get('programrecordIndex');
        var restemp = this.get('programrecordModel').objectAt(indextemp);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    }

  }
});
