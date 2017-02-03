import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
//    Ember.$('.tabular.menu .item').tab();
        Ember.$(document).ready(function () {
            Ember.$('.ui .item').on('click', function () {
                Ember.$('.ui .item').removeClass('active');
                Ember.$(this).addClass('active');
            });
        });
    },


    isHomeShowing: true,
    isStudentsRecordsDataEntry: false,
    isAboutShowing: false,
    isAddStudentShowing: false,
    isAddResidencyShowing: false,

    actions: {
        home () {
            this.set('isHomeShowing', true);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isAboutShowing', false);
            this.set('isAddStudentShowing', false);
          this.set('isAddResidencyShowing', false);
        },

        studentsDataEntry (){
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', true);
            this.set('isAboutShowing', false);
            this.set('isAddStudentShowing', false);
          this.set('isAddResidencyShowing', false);
        },

        about (){
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isAboutShowing', true);
            this.set('isAddStudentShowing', false);
          this.set('isAddResidencyShowing', false);
        },

        addStudent(){
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isAboutShowing', false);
            this.set('isAddStudentShowing', true);
          this.set('isAddResidencyShowing', false);
        },

      addResidency(){
        this.set('isHomeShowing', false);
        this.set('isStudentsRecordsDataEntry', false);
        this.set('isAboutShowing', false);
        this.set('isAddStudentShowing', false);
        this.set('isAddResidencyShowing', true);
      }
    }
});
