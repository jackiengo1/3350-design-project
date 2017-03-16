import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  store: Ember.inject.service(),
  name: null,

  actions: {
    logout(){
      this.get('oudaAuth').close();
      this.get('routing').transitionTo('login');
    }
  }
});
