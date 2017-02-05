import Ember from 'ember';
//first and last broken
export default Ember.Component.extend({
  store: Ember.inject.service(),
  showAllStudents: false,
  residencyModel: null,
  residencyIndex:null,
  genderModel: null,
  genderIndex:null,
  selectedResidency: null,
  selectedGender: null,
  selectedDate: null,
  studentsRecords: null,
  currentStudent: null,
  currentIndex: null,
  firstIndex: 0,
  lastIndex: 0,
  studentPhoto: null,
  limit: null,
  offset: null,
  pageSize: null,
  movingBackword: false,
  undoStack: Ember.A(),

  studentModel: Ember.observer('offset', function () { //observes the offset variable. When it changes run code.
    var self = this;
    this.get('store').query('student', {
      limit: self.get('limit'),
      offset: self.get('offset')
    }).then(function (records) {
      self.set('studentsRecords', records);
      //console.log(this.get('studentsRecords').objectAt(2).get('resInfo'));
      self.set('firstIndex', records.indexOf(records.get("firstObject")));
      self.set('lastIndex', records.indexOf(records.get("lastObject")));
      if (self.get('movingBackword')) {
        self.set('currentIndex', records.indexOf(records.get("lastObject")));
      } else {
        self.set('currentIndex', records.indexOf(records.get("firstObject")));
      }
    });
  }),

  fetchStudent: Ember.observer('currentIndex', function () {  //observes changes to the index
    this.showStudentData(this.get('currentIndex'));           //calls function showStudentData with current index
  }),

  init() {
    this._super(...arguments);
    // load Residency data model
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
      console.log(Ember.inspect(records));
    });

    this.get('store').findAll('gender').then(function(records){
      self.set('genderModel', records);

    });


    // load first page of the students records
    this.set('limit', 10);
    this.set('offset', 0);
    this.set('pageSize', 10);
    var self = this;
    this.get('store').query('student', {
      limit: self.get('limit'),
      offset: self.get('offset')
    }).then(function (records) {
      self.set('studentsRecords', records);
      self.set('firstIndex', records.indexOf(records.get("firstObject")));
      self.set('lastIndex', records.indexOf(records.get("lastObject")));

      // Show first student data
      self.set('currentIndex', self.get('firstIndex'));
    });
  },

  showStudentData: function (index) {
    this.set('currentStudent', this.get('studentsRecords').objectAt(index));
    this.set('studentPhoto', this.get('currentStudent').get('photo'));
    var date = this.get('currentStudent').get('DOB');
    var datestring = date.toISOString().substring(0, 10);
    this.set('selectedDate', datestring);
  },

  didRender() {
    Ember.$('.menu .item').tab();
  },


  actions: {
    saveStudent () {
      var updatedStudent = this.get('currentStudent');
      var res = this.get('store').peekRecord('residency', this.get('selectedResidency'));
      var gen = this.get('store').peekRecord('gender', this.get('selectedGender'));
      if (gen != null) {
        updatedStudent.set('genderInfo', gen);
      }
      updatedStudent.set('DOB', new Date(this.get('selectedDate')));
      if (res != null) {
        updatedStudent.set('resInfo', res);
      }
      updatedStudent.save().then(() => {
        //     this.set('isStudentFormEditing', false);
      });
    },

    firstStudent() {
      this.set('currentIndex', this.get('firstIndex'));
    },

    nextStudent() {
      this.set('movingBackword' , false);
      if (this.get('currentIndex') < this.get('lastIndex')) {
        this.set('currentIndex', this.get('currentIndex') + 1);
        //     console.log(JSON.stringify(this.get('currentStudent')));
      }
      else {
        this.set('offset', this.get('offset') + this.get('pageSize'));
      }
    },
    findStudent() {

    },
    previousStudent() {
      this.set('movingBackword' , true);
      if (this.get('currentIndex') > 0) {
        this.set('currentIndex', this.get('currentIndex') - 1);
      }
      else if (this.get('offset') > 0) {
        this.set('offset', this.get('offset') - this.get('pageSize'));
      }
    },

    lastStudent() {
      this.set('currentIndex', this.get('lastIndex'));
    },

    allStudents() {
      this.set('showAllStudents', true);
    },

    deleteStudent(){

      this.get('currentStudent').deleteRecord();
      this.get('currentStudent').save();

      this.set('movingBackword' , true);
      if(this.get("currentIndex") == this.get("firstIndex")){
        this.set('movingBackword' , false);
        this.set('currentIndex', this.get('currentIndex') + 1);
      }
      else if (this.get('currentIndex') > 0) {
        this.set('currentIndex', this.get('currentIndex') - 1);
      }
      else if (this.get('offset') > 0) {
        this.set('offset', this.get('offset') - this.get('pageSize'));
      }


    },

    //delete residency
    deleteResidency(){
      var indextemp = this.get('residencyIndex');
      var restemp = this.get('residencyModel').objectAt(indextemp);
      console.log(restemp);
      restemp.deleteRecord();
      restemp.save();
    },

    //delete gender
    deleteGender(){
      var indextemp = this.get('genderIndex');
      var restemp = this.get('genderModel').objectAt(indextemp);
      console.log(restemp);
      restemp.deleteRecord();
      restemp.save();
    },


    selectGender (gender){
      this.set('selectedGender', gender);
      console.log(gender);
    },

    selectResidency (residency){
      this.set('selectedResidency', residency);
      console.log(residency);
    },

    assignDate (date){
      this.set('selectedDate', date);
    },

    //used to show the list of residency for delete function
    getResidence: function (residency) {
      var index = this.get('residencyModel').indexOf(residency);
      this.set('residencyIndex', index);
    },

    //used to show the list of gender for delete function
    getGender: function (gender) {
      var index = this.get('genderModel').indexOf(gender);
      this.set('genderIndex', index);
    },
  }
});
