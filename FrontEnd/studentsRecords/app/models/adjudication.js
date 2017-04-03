import DS from 'ember-data';

export default DS.Model.extend({
date: DS.attr(),
termAVG: DS.attr(),
termUnitPassed:DS.attr(),
termUnitsTotal: DS.attr(),
note: DS.attr(),
studentInfo: DS.belongsTo('student'),
semester: DS.belongsTo('term'),
adjudicationCategory: DS.belongsTo('adjudication-category'),
category: DS.belongsTo('category')
});
