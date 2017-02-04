import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  name: null,
  students: null,

  init() {
    this._super(...arguments);
    // load Residency data model
    var self = this;
  },

  actions: {
    addResidency(){
      var newResidency = this.get('store').createRecord('residency', {
        name: this.get('residencyName'),
      });
      newResidency.save();
    }
  }
});
