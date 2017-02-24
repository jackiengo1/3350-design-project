import DS from 'ember-data';

export default DS.Model.extend({
    ID: DS.attr(),
    name: DS.attr(),
    description: DS.attr(),
    highSchoolCourses: DS.hasMany('high-school-courses'),

});
