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
  logicalDBDemoArray:Ember.A(),

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
      //after get the logical expression  from db, reassemble the demo for exp
      for(let i=0;i<records.get('length');i++)
      {
        
        self.get('logicalDBDemoArray').pushObject()
      }
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
      this.get('logicalExpArray').clear();
      this.get('logicalLinkArray').clear();
      this.get('logicalDemoArray').clear();

    },

    deleteOneExp(oneDemo){
      //first search throught the demo array to find the index
      {
        var demoTemp = this.get('logicalDemoArray');
        for(let i=0;i<demoTemp.get('length');i++)
        {
          if(oneDemo == demoTemp.objectAt(i))
          {
            //if the index is zero, then only pop from demo and logic exp array, do not touch the link array
            this.get('logicalDemoArray').removeAt(i);
            this.get('logicalExpArray').removeAt(i);
            //if the index is not zero remove the link array i-1, since link array always has one element less then the other two (first round doesn't add the link)
            if(i!==0)
            {
              this.get('logicalLinkArray').removeAt(i-1);
            }
            //only find the first one if there is a duplication, after that break out the loop
            break;
          }
        }
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
        var tempCode = this.get('store').peekRecord('assessment-code',tempAssessment);
        var newExpression = this.get('store').createRecord('logical-expression',{
          booleanExp: tempExp,
          logicalLink: tempLink,
          comment:tempCode,
        });
       newExpression.save();
      }
    }
  }
});
