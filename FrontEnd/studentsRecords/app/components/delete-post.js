import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  DP001IsPermitted: Ember.computed(function(){ //Delete user
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("DP001") >= 0);
    }
  }),

  didRender() {
    Ember.$('.button').popup();
  },

  actions: {
    deletePost (post){
      post.destroyRecord();
    }
  }

});
