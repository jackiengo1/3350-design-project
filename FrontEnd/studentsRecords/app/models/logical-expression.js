import DS from 'ember-data';

export default DS.Model.extend({
  booleanExp: DS.attr(),
  logicalLink: DS.attr(),
  link: DS.hasMany('logical-expression'),
  comment: DS.belongsTo('assessment-code'),
});
