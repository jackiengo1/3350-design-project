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

        console.log(this.get('gender') == 2);

        if(this.get('gender') == 1){
          this.set('photoPath', "/assets/studentsPhotos/male.png");
          console.log("male");
        }
        else if(this.get('gender') == 2){
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
      },

      getGender(_gender){
        this.set('gender', _gender);
      },

      getResidency( _residency){
        this.set('residency', _residency);
      },

  }


});
