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

    

  }
});
