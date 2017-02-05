import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  studentNum: null, //stores new student number to be added
  fName: null,      //stores new first name to be added
  lName: null,      //stores new last name to be added
  selectedGender: null,     //stores gender to be added
  DOB: null,        //date of birth to be added
  resModel: null,   //all the residencies in the db
  genderModel: null,  //all the genders in the db
  selectedResidency: null,    //the resdiency of the student to be added
  photoPath: null,    //photo path of the student photo
  basisOfAdmissionInput: null,
  admissionAvg: null,
  admissionComment: null,
  regComment: null,

  init() {
    this._super(...arguments);
    // load Residency data model and gender data model
    var self = this;
    this.get('store').findAll('residency').then(function (records) {
      self.set('resModel', records);
    });
    this.get('store').findAll('gender').then(function (records) {
      self.set('genderModel', records);
    });

  },

  actions: {

    addStudent() {

      //validates that the fields entered are correct
      if (validateFields(this.get('studentNum'), this.get('fName'), this.get('lName'), this.get('DOB'), this.get('selectedResidency'),this.get('selectedGender'))) {


        var res = this.get('store').peekRecord('residency', this.get('selectedResidency')); //get the students residency object
        var gen = this.get('store').peekRecord('gender', this.get('selectedGender')); //get the students gender object

        console.log(this.get('basisOfAdmissionInput'));
        console.log(this.get('admissionAvg'));
        console.log(this.get('admissionComment'));
        console.log(this.get('regComment'));

        var newStudent = this.get('store').createRecord('student', { //create a new student record
          number: this.get('studentNum'),
          firstName: this.get('fName'),
          lastName: this.get('lName'),
          DOB: new Date(this.get('DOB')),
          photo: this.get('photoPath'),
          registrationComments: this.get('regComment'),
          basisOfAdmission: this.get('basisOfAdmissionInput'),
          admissionAverage: this.get('admissionAvg'),
          admissionComments: this.get('admissionComment'),
          resInfo: res,
          genderInfo: gen,
        });
        newStudent.save(); //commit the student record to db
      }
    },

    getResidency(residency){             //gets the residence from the input box
      this.set('selectedResidency', residency);
    },
    getGender (gender){  //gets the gender from the input box
      this.set('selectedGender', gender);
      console.log(gender);
    },

  }//end actions


});

function validateFields(_studentNum, _fName, _lName, _dob, _residency, _gender) { //validates all the fields

  //validates the student number field
  if (_studentNum === null || _studentNum === undefined || _studentNum.length < 9 || _studentNum.length > 9) {
    alert("Student number must be 9 digits");
    return false;
  }

  //validates the first name field
  if (_fName === null || _fName === undefined || _fName.length === 0) {
    alert("First name field is empty");
    return false;
  }

  //validates the last name field
  if (_lName === null || _lName === undefined || _lName.length === 0) {
    alert("Last name field is empty");
    return false;
  }

  //validates the date of birth field
  if (_dob === null || _dob === undefined) {
    alert("Date of birth field is empty");
    return false;
  }

  //validates the residency field
  if (_residency === null || _residency === undefined) {
    alert("Must select a residence");
    return false;
  }

  //validates the gender field
  if (_gender === null || _gender === undefined){
    alert('Must select a gender');
    return false;
  }

  return true;

}//end validateFields


Ember.$(document).ready(function () {
  Ember.$("#dateInput").on("change keypress", function (event) { //only allows numbers to be inputed
    var asciiCode = event.which;
    console.log(asciiCode);

    if (asciiCode < 48 || asciiCode > 57) {
      return false;
    }

    if (Ember.$("#dateInput").val().length === 4 && asciiCode !== 8) { //adds dashes to date field to force correct format
      Ember.$("#dateInput").val(Ember.$("#dateInput").val() + "-");
    }
    if (Ember.$("#dateInput").val().length === 7 && asciiCode !== 8) {
      Ember.$("#dateInput").val(Ember.$("#dateInput").val() + "-");
    }

  });

}); //end ember.$document function
