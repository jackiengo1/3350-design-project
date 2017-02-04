import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  gender: DS.attr('number'),
  DOB: DS.attr('date'),
  photo: DS.attr(),
  resInfo: DS.belongsTo('residency'),
  registrationComments: DS.attr(),
  basisOfAdmission: DS.attr(),
  admissionAverage: DS.attr(),
  admissionComments: DS.attr(),
  advInfo: DS.belongsTo('advancedStanding'),
  genderInfo: DS.belongsTo('gender'),
  scholInfo: DS.belongsTo('scholarshipAward')

});
