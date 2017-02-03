import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
    studentNum: null,
    firstName: null,
    lastName: null,
    gender: 1,
    DOB: null,
    resModel: null,
    residency: null,

  init() {
    this._super(...arguments);
    // load Residency data model
    var self = this;
    this.get('store').findAll('residency').then(function (records) {
      self.set('resModel', records);
    });


  },



  actions: {

      addStudent() {
        console.log("Student Number: " + this.get('studentNum'));
        console.log("first name: " + this.get('firstName'));
        console.log("last name: " + this.get('lastName'));
        console.log("gender: " + this.get('gender'));
        console.log("dob: " + this.get('dob'));
        console.log("residency: " + this.get('residency'));
      },

      getGender(_gender){
        this.set('gender', _gender);
      },

      getResidency( _residency){
        this.set('residency', _residency);
      },

  }


});
