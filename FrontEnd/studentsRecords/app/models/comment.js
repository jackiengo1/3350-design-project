import DS from 'ember-data';

export default DS.Model.extend({
  timeStamp: DS.attr('date'),
  statement: DS.attr(),
  post: DS.belongsTo('post',{ async: true })
});
