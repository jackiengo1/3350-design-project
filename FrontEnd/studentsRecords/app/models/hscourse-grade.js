import DS from 'ember-data';

export default DS.Model.extend({
  mark:DS.attr(),
  studentInfo:  DS.belongsTo('student'),
  source: DS.belongsTo('high-school-course'),
});