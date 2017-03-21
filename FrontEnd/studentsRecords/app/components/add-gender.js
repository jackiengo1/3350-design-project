import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  name: null,
  students: null,
  genderModel:null,
  genderIndex:null,

  init() {
    this._super(...arguments);

    // load gender data model
    this.get('store').findAll('gender').then(function(records){
      self.set('genderModel', records);
    });

      var self = this;

  },

  actions: {
    addGender(){
      var newGender = this.get('store').createRecord('gender', {
        name: this.get('genderName'),
      });
      newGender.save();
    },

    //delete gender
    deleteGender(gender){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('genderModel').indexOf(gender);
        this.set('genderIndex', index);
        var indextemp = this.get('genderIndex');
        var restemp = this.get('genderModel').objectAt(indextemp);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },

    //used to show the list of gender for delete function
    getGender: function (gender) {
      var index = this.get('genderModel').indexOf(gender);
      this.set('genderIndex', index);
    },

  },
});