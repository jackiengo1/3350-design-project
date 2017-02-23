import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
description: DS.attr(),
highSchoolCourses: DS.hasMany('high-school-course'),
});
