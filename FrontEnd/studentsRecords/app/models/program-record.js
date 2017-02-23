import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
level: DS.attr(),
load: DS.attr(),
status: DS.attr(),
termCodeInfo: DS.belongsTo('term-code'),
planCodeInfo: DS.hasMany('plan-code'),
});
