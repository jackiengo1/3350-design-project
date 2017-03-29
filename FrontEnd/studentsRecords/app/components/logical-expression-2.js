import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  boolOperators: Ember.A(['=','<', '<=', '>', '>=','REQUIRED']),
  logicalLink:Ember.A(["and","or"]),
  courseModel: Ember.A(),
  logicalExpressionModel:null,
  assessmentCodeModel:null,

  //the logical expreesion model used for logical expression list when adding new logical expression
  currentLogicExpList:Ember.A(),

  selectedCourse:null,
  selectedBool:null,
  selectedAessmentCode:null,
  selectedlogicalLink:"",
  selectedLogicalExp:null,
  selectedLogicalExpArray:Ember.A(),
  inputValue:null,

  //switches for visiablility of the text field for mark
  numberFieldVisable:false,

  init() {
    this._super(...arguments);
    var self = this;
    //push the year weighted average to the front of the course model
    this.get('courseModel').pushObject("YEAR WEIGHTED AVERAEG");

    this.get('store').findAll('course-code').then(function(records){
      //for each records, push the name to the coursemodel array, and remove and duplications
      for(let i=0;i<records.get('length');i++)
      {
        let name = records.objectAt(i).get('name');
        let namearray = self.get('courseModel');
        let found = false;
        //going through the courseModel check if the name existing in the array
        for(let j=0;j<namearray.get('length');j++)
        {
          if(namearray.objectAt(j) == name)
          {
            found = true;
            break;
          }
        }
        //if nothing is found add to the array
        if(!found)
        {
          namearray.pushObject(name);
        }
      }
    });

    this.get('store').findAll('logical-expression').then(function(records){
      self.set('logicalExpressionModel',records);
      //at the very beginning making the currentLogicExpList same with logical expression model
      for(let i=0;i<records.get('length');i++)
      {
        self.get('currentLogicExpList').pushObject(records.objectAt(i));
      }
    });


    this.set('assessmentCodeModel',this.get('store').findAll('assessment-code'));
  },

  actions: {
    selectCourse(course){
      this.set('selectedCourse',course);
    },

    selectBool(bool){
      this.set('selectedBool',bool);

      if(bool === "=" || bool ===">" || bool ==="<" || bool ==="<=" || bool === ">=")
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

    selectLogicalExp(exp){
      //if the logical expressin array is not null, then a logical link must be selected
      // if(this.get('showLogic')&& this.get('selectedlogicalLink')=="" && selectedLogicalExpArray.get('length') === 0)
      // {
      //   alert("Logical Link can not be empty!");
      //   //this.set('errorMsg',"Logical Link can not be empty!");
      // }
      this.set('selectedLogicalExp',exp);
    },

    //add the selected logical expression to the logicalexp array
    addLogicalExp(){
      let logic = this.get('selectedLogicalExp');
      //if the selected logical expression is not null
      if(logic != null && logic !="null")
      {
        //find the logical expresion object from the cache
        let selectedexp =this.get('store').peekRecord('logical-expression',logic);
        //add the current logical expression to the array
        this.get('selectedLogicalExpArray').pushObject(selectedexp);
        //delete this logical expression from the currentLogicExpList
        this.get('currentLogicExpList').removeObject(selectedexp);
      }
      else{
        alert("You must select a logical expression before adding");
      }
    },

    //construct and post the new logical expresion object to the backend
    postLogicalExp(){
      //if number field is visiable assign the value otherwise keep it null
      var numberFieldValue = "";
      if(this.get('numberFieldVisable'))
      {
        numberFieldValue = this.get('inputValue');
      }
       var booleanValue = this.get('selectedBool');
       if(booleanValue == "null" || booleanValue == null)
       {
         alert("You must select an operator!");
         //this.set('errorMsg',"You must select an operator!" );
       }
       else if (this.get('numberFieldVisable') && this.get('inputValue')==null && this.get('inputValue')=="")
       {
         alert("Number field can not be empty!");
         //this.set('errorMsg',"Number field can not be empty!");
       }
       else if (this.get('selectedCourse')==null || this.get('selectedCourse') =="")
       {
         alert("Course can not be empty!");
         //this.set('errorMsg',"Logical Link can not be empty!");
       }
       else{
         //if all mandantory infomation is filled, then proceed
         //compress the couse name + boolean operator + mark if mark exist
         let combinedExp = this.get('selectedCourse')+this.get('selectedBool')+numberFieldValue;
         let logicalLink = this.get('selectedlogicalLink');
         let logicalExpRefArray = this.get('selectedLogicalExpArray');
           //if selectedAessmentCode is not null find the object in local cache, if null tempcode will be null as well since nothing found
           let tempCode = this.get('store').peekRecord('assessment-code',this.get('selectedAessmentCode'));

        let newExpression = this.get('store').createRecord('logical-expression',{
          booleanExp: combinedExp,
          logicalLink: logicalLink,
          link: logicalExpRefArray,
          comment: tempCode,
        });
       newExpression.save();
      }
    },
  },

});
