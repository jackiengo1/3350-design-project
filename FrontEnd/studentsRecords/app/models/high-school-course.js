import DS from 'ember-data';

export default DS.Model.extend({
level:DS.attr(),
source:DS.attr(),
unit:DS.attr(),
HSCourseGradeInfo: DS.hasMany('hscourse-grade'),
SecondSchoolInfo:DS.belongsTo('secondary-school'),
HighSchoolSubjectInfo:DS.belongsTo('high-school-subject'),
});
