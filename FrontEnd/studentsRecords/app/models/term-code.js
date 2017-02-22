import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
programRecordInfo: DS.hasMany('program-record'),
});
