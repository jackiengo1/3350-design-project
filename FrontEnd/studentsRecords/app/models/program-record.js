import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
level: DS.attr(),
load: DS.attr(),
status: DS.attr(),
gradeInfo: DS.hasMany('grade'),
courseCodeInfo: DS.belongsTo('course-code'),
termCodeInfo: DS.belongsTo('term-code'),
//plan code is a many to many relation, currently not sure if this correct
planCodeInfo: DS.hasMany('plan-code'),
});
