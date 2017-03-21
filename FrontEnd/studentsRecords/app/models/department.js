import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  faculty: DS.belongsTo('faculty'),
  programAdministrationInfo: DS.hasMany('program-administration'),
});
