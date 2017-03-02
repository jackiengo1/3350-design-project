import DS from 'ember-data';

export default DS.Model.extend({
courseLetter: DS.attr(),
courseNumber: DS.attr(),
name: DS.attr(),
unit: DS.attr(),
semester: DS.belongsTo('term-code'),
mark: DS.belongsTo('grade'),
});
