import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  assessmentCodeModel:null,
  departmentModel:null,
  selectedAssessment:null,
  selectedDepartment:null,

  actions:{
    selectAssessment(assessment){
      this.set('selectedAssessment',assessment);
    },

    selectDepartment(depart){
      this.set('selectedDepartment',depart);
    },

    linkAssessmentDepartment(){
      var currentDept = this.get('selectedDepartment');
      var currentAssessmentCode = this.get('selectedAssessment');
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
        currentDept.set('assessmentInfo',currentAssessmentCode);
        currentDept.save();
      }
    },

  }
});
