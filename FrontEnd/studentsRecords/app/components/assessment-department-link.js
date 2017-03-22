import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  assessmentCodeModel:null,
  departmentModel:null,
  selectedAssessment:null,
  selectedDepartment:null,

  init() {
    this._super(...arguments);
    // load Residency data model
    var self = this;
    //get the course-code object to local
    this.get('store').findAll('department').then(function (records) {
      self.set('departmentModel', records);
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

    selectDepartment(depart){
      this.set('selectedDepartment',depart);
    },

    linkAssessmentDepartment(){
      var currentDept = this.get('store').peekRecord('department',this.get('selectedDepartment'));
      var currentAssessmentCode = this.get('store').peekRecord('assessment-code',this.get('selectedAssessment'));
      if(currentDept == "null" || currentDept == null)
      {
        alert("Please select a department!");
        return;
      }
      else if(currentAssessmentCode == "null" || currentAssessmentCode == null)
      {
        alert("Please select a assessment Code!");
        return;
      }
      else{
        //at this point two input are selected
        currentDept.set('comment',currentAssessmentCode);
        currentDept.save();
      }
    },

  }
});
