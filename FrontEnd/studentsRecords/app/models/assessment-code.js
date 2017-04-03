import DS from 'ember-data';

export default DS.Model.extend({
  code: DS.attr(),
  name: DS.attr(),
  adjudicationCategory: DS.belongsTo('adjudication-category'),
  testExpression: DS.hasMany('logical-expression'),
  departmentInfo: DS.hasMany('department'),
});
