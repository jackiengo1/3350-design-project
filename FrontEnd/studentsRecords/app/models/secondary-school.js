import DS from 'ember-data';

export default DS.Model.extend({
  ID: DS.attr(),
  name: DS.attr(),
  highSchoolCoursesInfo: DS.hasMany('high-school-course'),
});
