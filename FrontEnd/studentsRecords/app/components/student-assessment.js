import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
  },

  actions: {

    generatePDFs(){

    },

    generateExcelFiles(){

    },

  }

});
