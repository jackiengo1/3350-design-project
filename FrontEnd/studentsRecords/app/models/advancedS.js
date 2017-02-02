import DS from 'ember-data';

export default DS.Model.extend({
  course: DS.attr(),
  description: DS.attr(),
  units: DS.attr(),
  grade: DS.attr(),
  from: DS.attr()

});/**
 * Created by Ciaran on 2017-02-02.
 */
