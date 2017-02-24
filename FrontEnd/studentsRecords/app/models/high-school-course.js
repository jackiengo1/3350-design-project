import DS from 'ember-data';

export default DS.Model.extend({
level:DS.attr(),
source:DS.attr(),
unit:DS.attr(),
courseGrade: DS.hasMany('hscourse-grade'),
school:DS.belongsTo('secondary-school'),
course:DS.belongsTo('high-school-subject'),
});
