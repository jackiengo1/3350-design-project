import DS from 'ember-data';

export default DS.Model.extend({
  code: DS.attr(),
  name: DS.attr(),
  adjudicationInfo: DS.hasMany('adjudication'),
  testExpression: DS.hasMany('logical-expression'),
  faculty: DS.hasMany('faculty'),
});
