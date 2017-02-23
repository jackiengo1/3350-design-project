import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  secondarySchoolModel: null,


  init() {
    this._super(...arguments);
    var self = this;
    // load gender data model
    this.get('store').findAll('secondarySchool').then(function(records){
      self.set('secondarySchoolModel', records);
    });
    console.log(this.get('secondarySchoolModel'));


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
      var newhsCourse = this.get('store').createRecord('high-school-courses', {
        level: this.get('level'),
        source:this.get('source'),
        unit: this.get('unit'),
        HSCourseGradeInfo: this.get('gradeInfo'),
        SecondSchoolInfo: this.get('ssInfo'),
        HighSchoolSubjectInfo: this.get('hsSubjectInfo')
      });
      newhsCourse.save();
    },

    //Add a secondary school
    addSecondarySchool(){
      var newSecondarySchool = this.get('store').createRecord('secondary-school', {
        name: this.get('ssName'),
        highSchoolCoursesInfo: this.get('highSchoolCoursesInfo'),
      });
      newSecondarySchool.save();
    },

    //Add a high-school subject
    addhsSubject(){
      var newhsSubject = this.get('store').createRecord('high-school-subject', {
        name: this.get('subjectName'),
        description: this.get('description'),
        highSchoolCourses: this.get('courses'),
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

    deleteSecondarySchool(secondaryschool){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('ssModel').indexOf(secondaryschool);
        this.set('ssIndex', index);
        var indextemp = this.get('ssIndex');
        var restemp = this.get('ssModel').objectAt(indextemp);

        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    //Add a high-school subject
    deletehsSubject(hssubject){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('hsSubjectModel').indexOf(hssubject);
        this.set('hsSubjectIndex', index);
        var indextemp = this.get('hsSubjectIndex');
        var restemp = this.get('hsSubjectModel').objectAt(indextemp);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    }

  }
});
