import DS from 'ember-data';

export default DS.Model.extend({
mark: DS.attr(),
note: DS.attr(),
studentInfo: DS.belongsTo('student'),
programRecordInfo: DS.belongsTo('program-record'),
});
