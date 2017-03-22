import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  name: null,
  students: null,
  residencyModel:null,
  residencyIndex:null,

  init() {
    this._super(...arguments);
    // load Residency data model
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
    });

    var self = this;
  },

  actions: {
    addResidency(){
      var newResidency = this.get('store').createRecord('residency', {
        name: this.get('residencyName'),
      });
      newResidency.save();
    },

    //delete residency
    deleteResidency( residency){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        var index = this.get('residencyModel').indexOf(residency);
        this.set('residencyIndex', index);
        var indextemp = this.get('residencyIndex');
        var restemp = this.get('residencyModel').objectAt(indextemp);
        console.log(restemp);
        restemp.deleteRecord();
        restemp.save();
      }
    },
    editResidency(residency){
      var index = this.get('residencyModel').indexOf(residency);
      this.set('residencyIndex', index);
      var indextemp = this.get('residencyIndex');
      var restemp = this.get('residencyModel').objectAt(indextemp);
      restemp.set('name', this.get('residencyName'));
    },

    //used to show the list of residency for delete function
    getResidence: function (residency) {
      var index = this.get('residencyModel').indexOf(residency);
      this.set('residencyIndex', index);
    },


  }
});