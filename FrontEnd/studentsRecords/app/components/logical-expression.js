import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  courseModel:null,
  boolExpression:Ember.A(["=",">","<","Required"]),
  logicalLink:Ember.A(["and","or"]),
  assessmentCodeModel:null,
  logicalExpModel:null,

  selectedBooleanSymbol:null,
  selectedCourse:null,
  selectedBool:null,
  inputValue:null,
  numberFieldVisable:false,
  selectedAessmentCode:null,
  selectedlogicalLink:"",
  showLogic:false,
  logicalExpArray:Ember.A(),
  logicalLinkArray:Ember.A(),
  logicalDemoArray:Ember.A(),

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

      if(bool === "=" || bool ===">" || bool ==="<")
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

    selectlogicLink(link){
      this.set('selectedlogicalLink',link);
    },

    addExpression(){
      //if number field is visiable assign the value otherwise keep it null
      var numberFieldValue = "";
      if(this.get('numberFieldVisable'))
      {
        numberFieldValue = this.get('inputValue');
      }
       var booleanValue = this.get('selectedBool');
       if(booleanValue == "null")
       {
         alert("You must select an operator!");
       }
       else if (this.get('numberFieldVisable') && this.get('inputValue')==null && this.get('inputValue')=="")
       {
         alert("Number field can not be empty!");
       }
       else if(this.get('showLogic')&& this.get('selectedlogicalLink')=="")
       {
         alert("Logical Link can not be empty!");
       }
       else{
         var courseValue = this.get('store').peekRecord('course-code',this.get('selectedCourse')).get('name');
         //combine the course boolean value into a single string
         var booleanExpString = courseValue+" "+booleanValue+" "+numberFieldValue;
         //after adding the first expression, show the logical link area
         this.set('showLogic',true);
         //if this is not the first run, add the logic link to the logical link array
         if(this.get('showLogic'))
         {
           let logiclinktemp = this.get('selectedlogicalLink');
           this.get('logicalLinkArray').pushObject(logiclinktemp);
           let expDemostring = logiclinktemp+" "+booleanExpString;
           this.get('logicalDemoArray').pushObject(expDemostring);
         }

         if(!this.get('showLogic'))
         {
           //for first expression only add the expression to the demo array
           this.get('logicalDemoArray').pushObject(booleanExpString);
         }
         //add the expession string into logical expression array
         this.get('logicalExpArray').pushObject(booleanExpString);
       }

    },

    deleteExpression()
    {
      //clear all element in the expression and link arrrys
      var tempExp = this.get('logicalExpArray');
      var tempLink = this.get('logicalLinkArray');
      var tempDemo = this.get('logicalDemoArray');
      for(let i=0;i<tempExp.get('length');i++)
      {
        tempExp.popObject();
      }
      for(let i=0;i<tempLink.get('length');i++)
      {
        tempLink.popObject();
      }
      //pop out everthing for the demo array as well
      for(let i=0;i<tempDemo.get('length');i++)
      {
        tempDemo.popObject();
      }
    },

    saveExpOnDB()
    {
      var tempAssessment = this.get('selectedAessmentCode');
      if(tempAssessment == null|| tempAssessment=="null")
      {
        alert("You must select one assessment code");
      }
      else{
        var tempExp = this.get('logicalExpArray');
        var tempLink = this.get('logicalLinkArray');
        this.get('store').createRecord('logical-expression',{
          booleanExp: tempExp,
          logicalLink: tempLink,
          comment:tempAssessment,
        });
      }
    }
  }
});
