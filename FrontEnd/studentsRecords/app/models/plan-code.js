import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
//many to many relation with program record, not sure if this is correct
programRecordInfo: DS.hasMany('program-record'),
});
