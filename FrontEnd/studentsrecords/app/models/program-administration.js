import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  position: DS.attr(),
  dept: DS.belongsTo('department'),
});
