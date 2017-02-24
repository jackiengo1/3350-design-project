import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  secondarySchoolModel: null,
  subjectModel: null,
  courseModel: null,

  subjectTemp: null,
  schoolTemp: null,

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

    //Add a high-school course
    addhsCourse() {

      if (this.get('subjectTemp') == null)
      {
        alert("Please select a subject.");
      }
      else if (this.get('schoolTemp') == null)
      {
        alert("Please select a school");
      }
      else
      {
        var newhsCourse = this.get('store').createRecord('high-school-course', {
          level: this.get('level'),
          source:this.get('source'),
          unit: this.get('unit'),
          SecondSchoolInfo: this.get('schoolTemp'),
          HighSchoolSubjectInfo: this.get('subjectTemp')
        });
        newhsCourse.save();
      }
    },

    //Add a secondary school
    addSecondarySchool(){
      var newSecondarySchool = this.get('store').createRecord('secondary-school', {
        name: this.get('ssName')
      });
      newSecondarySchool.save();
    },

    //Add a high-school subject
    addhsSubject(){
      var newhsSubject = this.get('store').createRecord('high-school-subject', {
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
        var index = this.get('courseModel').indexOf(hscourse);
        var restemp = this.get('courseModel').objectAt(index);
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
    },

    selectSubject(subject){
      var subjectObj = this.get('store').peekRecord('high-school-subject', subject);
      this.set('subjectTemp', subjectObj);
    },

    selectSchool(school){
      var schoolObj = this.get('store').peekRecord('secondary-school', school);
      this.set('schoolTemp', schoolObj);
    }

  }
});
