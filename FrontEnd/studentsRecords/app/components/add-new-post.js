import Ember from 'ember';

export default Ember.Component.extend({


  isAdding: false,
  store: Ember.inject.service(),

  ANP01IsPermitted: Ember.computed(function(){ //Add new post
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ANP01") >= 0);
    }
  }),

  didRender() {
    this._super(...arguments);
    Ember.$('.ui.modal')
      .modal({
        closable: false,
        transition: 'horizontal flip',
      })
      .modal('show');
  },

  actions: {
    addNewPost (){
      this.set('title', null);
      this.set('body', null);
      this.set('isAdding', true);
    },
    savePost (){
      var myStore = this.get('store');
      var newPost = myStore.createRecord('post',{
        title: this.get('title'),
        body: this.get('body')
      });
      newPost.save();
      this.set('isAdding', false);
    },

    cancelPost (){
      this.set('isAdding', false);
      Ember.$('.ui.modal').modal('hide');
      Ember.$('.ui.modal').remove();
    }
  }


});