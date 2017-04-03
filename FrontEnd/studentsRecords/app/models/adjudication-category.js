import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  result: DS.attr(),
  adjudication: DS.hasMany('adjudication'),
  assessmentCode: DS.hasMany('assessment-code')
});
