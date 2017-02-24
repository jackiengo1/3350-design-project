import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  secondarySchoolModel: null,
  subjectModel: null,
  courseModel: null,

  secondarySchoolTab: true,
  subjectTab: false,
  courseTab: false,

  init() {
    this._super(...arguments);
    var self = this;
    // load gender data model
    this.get('store').findAll('secondarySchool').then(function(records){
      self.set('secondarySchoolModel', records);
    });
    console.log(this.get('secondarySchoolModel'));

    this.get('store').findAll('highSchoolSubject').then(function(records){
      self.set('subjectModel', records);
    });

    this.get('store').findAll('highSchoolCourse').then(function(records){
      self.set('courseModel', records);
    });
  },

  didRender() {
    Ember.$('.menu .item').tab();
  },


  actions: {
    //Add a high-school mark
    addhsMark(){
      var newhsMark = this.get('store').createRecord('hscourse-grade', {
        mark: this.get('mark'),
        studentInfo: this.get('studentInfo'),
        HighSchoolCourseInfo: this.get('hsCourseInfo')
      });
      newhsMark.save();
    },
    //Add a high-school course
    addhsCourse(){
      var newhsCourse = this.get('store').createRecord('high-school-course', {
        level: this.get('level'),
        source:this.get('source'),
        unit: this.get('unit'),
        SecondSchoolInfo: this.get('selectedSchool'),
        HighSchoolSubjectInfo: this.get('hsSubjectInfo')
      });
      newhsCourse.save();
    },

    //Add a secondary school
    addSecondarySchool(){
      var newSecondarySchool = this.get('store').createRecord('secondary-school', {
        name: this.get('ssName'),
        ID: this.get('ssId')
      });
      newSecondarySchool.save();
    },

    //Add a high-school subject
    addhsSubject(){
      var newhsSubject = this.get('store').createRecord('high-school-subject', {
        ID: this.get('subjectId'),
        name: this.get('subjectName'),
        description: this.get('description')
      });
      newhsSubject.save();
    },

    deletehsMark(hscoursegrade){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('hsMarkModel').indexOf(hscoursegrade);
        this.set('hsMarkIndex', index);
        var indextemp = this.get('hsMarkIndex');
        var restemp = this.get('hsMarkModel').objectAt(indextemp);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },
    //Add a high-school course
    deletehsCourse(hscourse){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('hsCourseModel').indexOf(hscourse);
        this.set('hsCourseIndex', index);
        var indextemp = this.get('hsCourseIndex');
        var restemp = this.get('hsCourseModel').objectAt(indextemp);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    //Add a secondary school
    deleteSecondarySchool( secondarySchool){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('secondarySchoolModel').indexOf(secondarySchool);
        var restemp = this.get('secondarySchoolModel').objectAt(index);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    //Add a high-school subject
    deletehsSubject(hssubject){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('subjectModel').indexOf(hssubject);
        var restemp = this.get('subjectModel').objectAt(index);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    }

  }
});
