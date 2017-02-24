import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
studetInfo: DS.belongsTo('student'),
program: DS.hasMany('program-record'),
courseInfo: DS.hasMany('course-code'),
});
