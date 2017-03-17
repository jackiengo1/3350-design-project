import Ember from 'ember';

export default Ember.Component.extend({

  routing: Ember.inject.service('-routing'),

  init(){
    this._super(...arguments);
  },

  actions:{

    userProfile(){
      this.get('routing').transitionTo('user');
    },

    adminPortal(){
      this.get('routing').transitionTo('admin-portal');
    },

  },
});
