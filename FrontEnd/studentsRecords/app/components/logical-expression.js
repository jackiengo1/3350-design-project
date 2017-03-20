import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  courseModel:null,
  boolExpression:Ember.A(["=",">","<",">=","<=","Required"]),
  logicalLink:Ember.A(["and","or"]),
  assessmentCodeModel:null,
  logicalExpModel:null,

  selectedBooleanSymbol:null,
  selectedCourse:null,
  selectedBool:null,
  inputValue:null,
  numberFieldVisable:false,
  selectedAessmentCode:null,
  selectedLogicalExp:null,
  selectedlogicalLink:null,
  showLogic:false,

  init() {
    this._super(...arguments);
    // load Residency data model
    var self = this;
    //get the course-code object to local
    this.get('store').findAll('course-code').then(function (records) {
      self.set('courseModel', records);
    });
    //get the assessment-code object to local
    this.get('store').findAll('assessment-code').then(function(records){
      self.set('assessmentCodeModel',records);
    });
    //get all existing logical expression to local
    this.get('store').findAll('logical-expression').then(function(records){
      self.set('logicalExpModel',records);
    });
  },

  actions:{

    selectCourse(course){
      this.set('selectedCourse',course);
    },

    selectBool(bool){
      this.set('selectedBool',bool);

      if(bool === "=" || bool ===">" || bool ==="<" || bool ===">=" || bool ==="<=")
      {
        //set the number field to show, so that user can type the value there
        this.set('numberFieldVisable',true);
      }
      else {
        //if the user select certain course is Required set the number field to hide
        this.set('numberFieldVisable',false);
      }
    },

    selectAssessmentcode(assessment){
      this.set('selectedAessmentCode',assessment);
    },

    selectLogicalExp(logicalExp){
      this.set('selectedLogicalExp',logicalExp);
    },

    selectlogicLink(link){
      this.set('selectedlogicalLink',link);
    },

    toggleShowLogic(){
      //each time this function is called, toggle the boolean value in the show logic
      this.toggleProperty('showLogic');
    },

    addExpression(){
      //if number field is visiable assign the value otherwise keep it null
      var numberFieldValue = null;
      if(this.get('numberFieldVisable'))
      {
        numberFieldValue = this.get('inputValue');
        console.log(numberFieldValue);
      }
      var booleanValue = this.get('selectedBool');
      var courseValue = this.get('selectedCourse');
      var assessmentValue = this.get('selectedAessmentCode');
      var logicalExpValue = this.get('selectedLogicalExp');
      var logicalLinkValue = this.get('selectedlogicalLink');
      //combine the course boolean value into a single string
      var booleanExpString = courseValue+booleanValue+numberFieldValue;
      //create a new logical expression record using the combined string
      this.get('store').createRecord('logical-expression',{
        booleanExp: booleanExpString,
        logicalLink:logicalLinkValue,
        comment: assessmentValue,
        link: logicalExpValue,
      });
    },
  }
});
