import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  name: null,
  students: null,
  genderModel:null,
  genderIndex:null,

  editGenderTemp: null,
  editGenderName: "",

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

<<<<<<< HEAD
    editGender(){
      if(this.get('editGenderName').length !== 0){
        var updatedGender = this.get('editGenderTemp');
        updatedGender.set('name', this.get('editGenderName'));
        updatedGender.save();
        alert('Successfully updated');
        Ember.$('.ui.modal.genderEdit').modal('hide');
      }
      else{
        alert('Textbox cannot be empty');
      }
=======
    editGender(gender){
      var index = this.get('genderModel').indexOf(gender);
      this.set('genderIndex', index);
      var indextemp = this.get('genderIndex');
      var restemp = this.get('genderModel').objectAt(indextemp);
      restemp.set('name', this.get('genderName'));
      restemp.save();
>>>>>>> 16a5a1a50af1ab95f0f97e9f87768106f2d91f43
    },

    //used to show the list of gender for delete function
    getGender: function (gender) {
      var index = this.get('genderModel').indexOf(gender);
      this.set('genderIndex', index);
    },

    openEditGenderModal(gender){
      console.log(gender);
      this.set('editGenderTemp', gender);
      console.log(this.get('editGenderTemp').get('name'));
      this.set('editGenderName', gender.get('name'));
      Ember.$('.ui.modal.genderEdit').modal('show');
    },

    closeEditGenderModal(){
      Ember.$('.ui.modal.genderEdit').modal('hide');
    },


  },
});
