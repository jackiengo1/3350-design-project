import DS from 'ember-data';

export default DS.Model.extend({
  term: DS.belongsTo('term-code'),
  program: DS.hasMany('program-record'),
  courseInfo: DS.hasMany('course-code'),
  studentInfo: DS.belongsTo('student')
});
