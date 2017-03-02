import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  highSchoolCoursesInfo: DS.hasMany('high-school-course'),
});
