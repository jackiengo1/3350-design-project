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
    addGender(){
      var newGender = this.get('store').createRecord('gender', {
        name: this.get('genderName'),
      });
      newGender.save();
    }
  }
});
