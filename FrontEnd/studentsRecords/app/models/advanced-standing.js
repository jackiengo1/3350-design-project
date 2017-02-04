import DS from 'ember-data';

export default DS.Model.extend({
  course: DS.attr(),
  description: DS.attr(),
  units: DS.attr(),
  grade: DS.attr(),
  from: DS.attr(), // the school that this course is from
  studentInfo:  DS.belongsTo('student')
});
