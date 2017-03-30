import DS from 'ember-data';

export default DS.Model.extend({
  code: DS.attr(),
  name: DS.attr(),
  adjudicationInfo: DS.hasMany('adjudication-result'),
  testExpression: DS.hasMany('logical-expression'),
  departmentInfo: DS.hasMany('department'),
});
