import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  store: Ember.inject.service(),
  ID: null,

  commentsModel: Ember.computed('isEditing', function(){
   return this.get('store').query('comment', {'post': this.ID});

  }),



  actions: {
    saveComment () {
      var myStore = this.get('store');
      var post = myStore.peekRecord('post', this.ID);
      var newComment = myStore.createRecord('comment', {
        statement: this.get('statement'),
        timeStamp: new Date(),
        post: post
      });

      newComment.save().then(()=> {
        this.set('isEditing', false);
      });




    },

    addComment() {
      this.set('isEditing', true);
    },

    cancel () {
      this.set('isEditing', false);
    }
  }
});
