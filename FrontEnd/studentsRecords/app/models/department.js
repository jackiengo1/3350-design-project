import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  comment: DS.belongsTo('assessment-code'),
  programAdministrationInfo: DS.hasMany('program-administration'),
});
