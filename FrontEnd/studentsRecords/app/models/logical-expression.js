import DS from 'ember-data';

export default DS.Model.extend({
  booleanExp: DS.attr(),
  logicalLink: DS.attr(),
  comment: DS.belongsTo('assessment-code'),
  link: DS.hasMany('logical-expression'),
});
