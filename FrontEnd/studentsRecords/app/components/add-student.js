import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  studentNum: null, //stores new student number to be added
  fName: null,      //stores new first name to be added
  lName: null,      //stores new last name to be added
  gender: null,     //stores gender to be added
  DOB: null,        //date of birth to be added
  resModel: null,   //all the residencies in the db
  genderModel: null,  //all the genders in the db
  residency: null,    //the resdiency of the student to be added
  photoPath: null,    //photo path of the student photo

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

      var res = this.get('store').peekRecord('residency', this.get('residency')); //get the students residency object
      var gen = this.get('store').peekRecord('gender', this.get('gender')); //get the students gender object

      //validates that the fields entered are correct
      if (validateFields(this.get('studentNum'), this.get('fName'), this.get('lName'), this.get('DOB'), this.get('residency'))) {

        // if (this.get('gender') == 1) {                                //checks for female or male
        //   this.set('photoPath', "/assets/studentsPhotos/male.png");
        //   console.log("male");
        // }
        // else if (this.get('gender') == 2) {
        //   this.set('photoPath', "/assets/studentsPhotos/female.png");
        //   console.log("female");
        // }

        var newStudent = this.get('store').createRecord('student', { //create a new student record
          number: this.get('studentNum'),
          firstName: this.get('fName'),
          lastName: this.get('lName'),
          DOB: new Date(this.get('DOB')),
          photo: this.get('photoPath'),
          registrationComments: this.get('fName'),
          basisOfAdmission: this.get('fName'),
          admissionAverage: this.get('fName'),
          admissionComments: this.get('fName'),
          resInfo: res,
          advInfo: null,
          genderInfo: gen,
          scholInfo: null
        });
        newStudent.save(); //commit the student record to db
      }
    },

    getGender(_gender){             //gets the gender from the input box
      this.set('gender', _gender);
    },

    getResidency(_residency){             //gets the residence from the input box
      this.set('residency', _residency);
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
