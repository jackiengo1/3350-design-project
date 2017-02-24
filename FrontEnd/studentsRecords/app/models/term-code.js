import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
studetInfo: DS.belongsTo('student'),
programRecordInfo: DS.hasMany('program-record'),
courseCodeInfo: DS.hasMany('course-code'),
});
