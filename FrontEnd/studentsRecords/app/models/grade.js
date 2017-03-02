import DS from 'ember-data';

export default DS.Model.extend({
mark: DS.attr(),
note: DS.attr(),
courseCodeInfo: DS.hasMany('course-code'),
});
