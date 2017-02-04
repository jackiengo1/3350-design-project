import DS from 'ember-data';

export default DS.Model.extend({
  note: DS.attr(),
  studentInfo:  DS.belongsTo('student')
});
