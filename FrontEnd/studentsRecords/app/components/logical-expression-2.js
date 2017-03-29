import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  boolOperators: Ember.A(['=','<', '<=', '>', '>=','REQUIRED']),
  courseModel: null,

  init() {
    this._super(...arguments);

    //this.get('store').unloadAll();
    this.set('courseModel', this.get('store').findAll('course-code'));

  },

  actions: {
    selectCourse(){

    },

    selectOperator(){

    },

    getInputValue(){
      
    }
  },

});
