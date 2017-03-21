import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  store: Ember.inject.service(),
  name: null,

  init() {
    this._super(...arguments);
    this.get('oudaAuth').close();
    this.get('routing').transitionTo('login');
  },

  actions: {
    logout(){
      this.get('oudaAuth').close();
      this.get('routing').transitionTo('login');
    }
  }
});