import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  DOB: DS.attr('date'),
  photo: DS.attr(),
  resInfo: DS.belongsTo('residency'),
  registrationComments: DS.attr(),
  basisOfAdmission: DS.attr(),
  admissionAverage: DS.attr(),
  admissionComments: DS.attr(),
  advInfo: DS.hasMany('advancedStanding'),
  genderInfo: DS.belongsTo('gender'),
  scholInfo: DS.hasMany('scholarshipAward'),
  hsCourseGrade: DS.hasMany('hscourse-grade'),
  gradeInfo:DS.hasMany('grade'),
});
