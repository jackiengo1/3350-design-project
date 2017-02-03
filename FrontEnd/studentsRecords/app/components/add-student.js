import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    studentNum: null,
    fName: null,
    lName: null,
    gender: 1,
    DOB: null,
    resModel: null,
    residency: null,
    photoPath: null,

  init() {
    this._super(...arguments);
    // load Residency data model
    var self = this;
    this.get('store').findAll('residency').then(function (records) {
      self.set('resModel', records);
    });


  },





  actions: {

      addStudent() {
        console.log("Student Number: " + this.get('studentNum'));
        console.log("first name: " + this.get('fName'));
        console.log("last name: " + this.get('lName'));
        console.log("gender: " + this.get('gender'));
        console.log("dob: " + this.get('DOB'));
        console.log("residency: " + this.get('residency'));

        var res = this.get('store').peekRecord('residency', this.get('residency'));

        if(validateFields(this.get('studentNum'), this.get('fName'), this.get('lName'), this.get('DOB'),this.get('residency') )) {

          if (this.get('gender') == 1) {
            this.set('photoPath', "/assets/studentsPhotos/male.png");
            console.log("male");
          }
          else if (this.get('gender') == 2) {
            this.set('photoPath', "/assets/studentsPhotos/female.png");
            console.log("female");
          }

          var newStudent = this.get('store').createRecord('student', {
            number: this.get('studentNum'),
            firstName: this.get('fName'),
            lastName: this.get('lName'),
            gender: this.get('gender'),
            DOB: new Date(this.get('DOB')),
            photo: this.get('photoPath'),
            resInfo: res
          });
          newStudent.save();
        }
      },

      getGender(_gender){
        this.set('gender', _gender);
      },

      getResidency( _residency){
        this.set('residency', _residency);
      },

  }


});

function validateFields(_studentNum, _fName, _lName, _dob, _residency ){

  if(_studentNum === null || _studentNum === undefined || _studentNum.length < 9 || _studentNum.length > 9){
    alert("Student number must be 9 digits");
    return false;
  }

  if(_fName === null || _fName === undefined){
    alert("First name field is empty");
    return false;
  }

  if(_lName === null || _lName === undefined){
    alert("Last name field is empty");
    return false;
  }

  if(_dob === null || _dob === undefined){
    alert("Date of birth field is empty");
    return false;
  }

  if(_residency === null || _residency === undefined){
    alert("Must select a residence");
    return false;
  }

  return true;

}

Ember.$(document).ready(function () {
  Ember.$("#dateInput").on("change keypress", function(event){
    var asciiCode = event.which;
    console.log(asciiCode);

    if(asciiCode < 48 || asciiCode > 57){
      return false;
    }

    if(Ember.$("#dateInput").val().length === 4 && asciiCode != 8){
      Ember.$("#dateInput").val(Ember.$("#dateInput").val() + "-");
    }
    if(Ember.$("#dateInput").val().length === 7 && asciiCode != 8){
      Ember.$("#dateInput").val(Ember.$("#dateInput").val() + "-");
    }

  });

});


