import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  isEditing: false,
  actions: {
    edit: function(){
      this.set('isEditing', true);
    },

    save: function(id){


      this.set('isEditing', false);
      var myStore = this.get('store');

      var self = this;
      myStore.findRecord('post',id).then(function(post) {
        post.set('title',self.get('selectedPost.title'));
        post.set('body', self.get('selectedPost.body'));
        post.save();
      });
      this.set('isEditing', false);
      this.get('routing').transitionTo('posts' );
    },

    cancel: function(){
      this.get('routing').transitionTo('posts' );
    }

  }

});
