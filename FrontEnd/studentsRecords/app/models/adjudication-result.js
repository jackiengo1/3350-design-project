import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
result: DS.attr(),
adjudication: DS.belongsTo('adjudication'),
assessmentCode: DS.belongsTo('assessment-code'),
});
