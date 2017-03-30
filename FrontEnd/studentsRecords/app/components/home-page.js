import Ember from 'ember';

export default Ember.Component.extend({

  routing: Ember.inject.service('-routing'),

  didInsertElement() {
    //    Ember.$('.tabular.menu .item').tab();
    Ember.$(document).ready(function () {
      Ember.$('.ui .item').on('click', function () {
        Ember.$('.ui .item').removeClass('active');
        Ember.$(this).addClass('active');
      });

      Ember.$('.ui.dropdown.item').dropdown({ on: 'hover' });
    });
  },

  isHomeShowing: true,
  isStudentsRecordsDataEntry: false,
  isAddGenderShowing: false,
  isAddResidencyShowing: false,
  isAddHighSchoolInfoShowing: false,
  isAddProgramRecordShowing: false,
  isStudentAssessmentShowing: false,
  isUserSettingsShowing: false,
  isLogicalExpShowing: false,
  isLogoutShowing: false,
  isDataLinkingShowing: false,

  actions: {
    home () {
      this.set('isHomeShowing', true);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddStudentShowing', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', false);
    },

    studentsDataEntry (){
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', true);
      this.set('isAddStudentShowing', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', false);
    },


    logout() {
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddStudentShowing', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', true);
      this.set('isDataLinkingShowing', false);
      Ember.$("body").css("background-color", "transparent");
    },

    addResidency(){
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddResidencyShowing', true);
      this.set('isAddGenderShowing', false);
      this.set('isAddStudentShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', false);
    },
    addGender(){
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', true);
      this.set('isAddStudentShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', false);
    },
    addHighSchoolInfo(){
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', false);
      this.set('isAddStudentShowing', false);
      this.set('isAddHighSchoolInfoShowing', true);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', false);
    },
    addProgramRecord(){
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', false);
      this.set('isAddStudentShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', true);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', false);
    },

    studentAssessment(){
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', false);
      this.set('isAddStudentShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', true);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', false);
    },

    addLogicalExp(){
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', false);
      this.set('isAddStudentShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', true);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', false);
    },

    addDataLinking() {
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAddResidencyShowing', false);
      this.set('isAddGenderShowing', false);
      this.set('isAddStudentShowing', false);
      this.set('isAddHighSchoolInfoShowing', false);
      this.set('isAddProgramRecordShowing', false);
      this.set('isStudentAssessmentShowing', false);
      this.set('isLogicalExpShowing', false);
      this.set('isLogoutShowing', false);
      this.set('isDataLinkingShowing', true);
    },

    userProfile(){
      this.get('routing').transitionTo('user');
    },

    adminPortal(){
      this.get('routing').transitionTo('admin-portal');
    },
  }
});
