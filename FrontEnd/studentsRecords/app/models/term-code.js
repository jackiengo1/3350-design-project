  import DS from 'ember-data';

export default DS.Model.extend({
name: DS.attr(),
semester: DS.hasMany('term')
});
