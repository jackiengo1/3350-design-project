import Ember from 'ember';

export default Ember.Component.extend({
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
    isAboutShowing: false,
    isAddGenderShowing: false,
    isAddResidencyShowing: false,
    isAddHighSchoolInfoShowing: false,
    isAddProgramRecordShowing: false,
    actions: {
        home () {
            this.set('isHomeShowing', true);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isAboutShowing', false);
            this.set('isAddStudentShowing', false);
            this.set('isAddResidencyShowing', false);
          this.set('isAddGenderShowing', false);
          this.set('isAddHighSchoolInfoShowing', false);
          this.set('isAddProgramRecordShowing', false);
        },

        studentsDataEntry (){
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', true);
            this.set('isAboutShowing', false);
            this.set('isAddStudentShowing', false);
          this.set('isAddResidencyShowing', false);
          this.set('isAddGenderShowing', false);
          this.set('isAddHighSchoolInfoShowing', false);
          this.set('isAddProgramRecordShowing', false);
        },

        about (){
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isAboutShowing', true);
            this.set('isAddStudentShowing', false);
          this.set('isAddResidencyShowing', false);
          this.set('isAddGenderShowing', false);
          this.set('isAddHighSchoolInfoShowing', false);
          this.set('isAddProgramRecordShowing', false);
        },

        addResidency(){
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isAboutShowing', false);
            this.set('isAddResidencyShowing', true);
          this.set('isAddGenderShowing', false);
          this.set('isAddStudentShowing', false);
          this.set('isAddHighSchoolInfoShowing', false);
          this.set('isAddProgramRecordShowing', false);
        },
        addGender(){
          this.set('isHomeShowing', false);
          this.set('isStudentsRecordsDataEntry', false);
          this.set('isAboutShowing', false);
          this.set('isAddResidencyShowing', false);
          this.set('isAddGenderShowing', true);
          this.set('isAddStudentShowing', false);
          this.set('isAddHighSchoolInfoShowing', false);
          this.set('isAddProgramRecordShowing', false);
        },
        addHighSchoolInfo(){
          this.set('isHomeShowing', false);
          this.set('isStudentsRecordsDataEntry', false);
          this.set('isAboutShowing', false);
          this.set('isAddResidencyShowing', false);
          this.set('isAddGenderShowing', false);
          this.set('isAddStudentShowing', false);
          this.set('isAddHighSchoolInfoShowing', true);
          this.set('isAddProgramRecordShowing', false);
        },
        addProgramRecord(){
          this.set('isHomeShowing', false);
          this.set('isStudentsRecordsDataEntry', false);
          this.set('isAboutShowing', false);
          this.set('isAddResidencyShowing', false);
          this.set('isAddGenderShowing', false);
          this.set('isAddStudentShowing', false);
          this.set('isAddHighSchoolInfoShowing', false);
          this.set('isAddProgramRecordShowing', true);
        }
    }
});
