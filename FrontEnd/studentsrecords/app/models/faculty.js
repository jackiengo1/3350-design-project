import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  comment: DS.belongsTo('assessment-code'),
  dept: DS.hasMany('department'),
});
