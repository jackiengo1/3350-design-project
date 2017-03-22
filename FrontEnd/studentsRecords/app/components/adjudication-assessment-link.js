import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  assessmentCodeModel:null,
  adjudicationModel:null,
  selectedAssessment:null,
  selectedAdjudication:null,

  init() {
    this._super(...arguments);
    // load Residency data model
    var self = this;
    //get the course-code object to local
    this.get('store').findAll('adjudication').then(function (records) {
      self.set('adjudicationModel', records);
    });
    //get the assessment-code object to local
    this.get('store').findAll('assessment-code').then(function(records){
      self.set('assessmentCodeModel',records);
    });
  },


  actions:{
    selectAssessment(assessment){
      this.set('selectedAssessment',assessment);
    },

    selectAdjudication(adjudication){
      this.set('selectedAdjudication',adjudication);
    },

    linkAssessmentAdjudication(){
      var currentAjudication = this.get('store').peekRecord('adjudication',this.get('selectedAdjudication'));
      var currentAssessmentCode = this.get('store').peekRecord('assessment-code',this.get('selectedAssessment'));
      if(currentAjudication == "null" || currentAjudication == null)
      {
        alert("Please select a adjudication!");
        return;
      }
      else if(currentAssessmentCode == "null" || currentAssessmentCode == null)
      {
        alert("Please select a assessment Code!");
        return;
      }
      else{
        //at this point two input are selected
        currentAjudication.set('comment',currentAssessmentCode);
        currentAjudication.save();
      }
    },

  }
});
