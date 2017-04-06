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

  //data used for editing logical expression
  loigcalExpForEdit:null,
  courseForEdit:null,
  operatorForEdit:null,
  markForEdit:null,
  linkForEdit:null,
  assessmentForEdit:null,
  ExpArrayForEdit:null,

  init() {
    this._super(...arguments);
    var self = this;
    //push the year weighted average to the front of the course model
    //this.get('courseModel').pushObject("YEAR WEIGHTED AVERAEG");

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

    this.get('store').findAll('assessment-code').then(function(records){
      self.set('assessmentCodeModel',records);
    });
  },

  didRender() {
    Ember.$('.menu .item').tab();
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
        //clear out the selectedLogicalExp after adding
        this.set('selectedLogicalExp',null);
      }
      else{
        alert("You must select a logical expression before adding");
      }
    },

    //construct and post the new logical expresion object to the backend
    postLogicalExp(){
      var self = this;
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
        let combinedExp = this.get('selectedCourse')+"  "+this.get('selectedBool')+"  "+numberFieldValue;
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
        newExpression.save().then(function(record){
          let allLogic = self.get('store').peekAll('logical-expression');
          //clear the currentLogicExpList array
          self.get('currentLogicExpList').clear();
          //after saving the new logical expression refreash the currentLogicExpList array
          for(let i=0;i<allLogic.get('length');i++)
          {
            self.get('currentLogicExpList').pushObject(allLogic.objectAt(i));
          }
          //clear the selectedLogicalExpArray
          self.get('selectedLogicalExpArray').clear();
        });
      }
    },

    deleteSelectedExp(selectedExp){
      //delete the selectedExp from the selectedLogicalExpArray
      this.get('selectedLogicalExpArray').removeObject(selectedExp);
      //after deleted from the selected array add it back to the option array
      this.get('currentLogicExpList').pushObject(selectedExp);
    },

    deleteRemoteExp(exp){
      //delete the logiical expression from remote
      let tempExp = exp;
      tempExp.deleteRecord();
      tempExp.save();
    },

    openEditLogicalExpForm(selectedExp){

      this.set('numberFieldVisable',false);

      //set the logcial expression for editing
      this.set('loigcalExpForEdit', selectedExp);
      let splitedExp = selectedExp.get('booleanExp').split("  ");
      this.set('courseForEdit',splitedExp[0]);
      this.set('operatorForEdit',splitedExp[1]);
      if(splitedExp[1] !=="Required")
      {
        //if the operator is not required then mark exist, else mark does not exsit.
        this.set('markForEdit',splitedExp[2]);
        //display the mark field
        this.set('numberFieldVisable',true);
      }
      //set the link for edit
      this.set('linkForEdit',selectedExp.get('logicalLink'));
      //set the assessment code for edit
      this.set('assessmentForEdit',selectedExp.get('comment'));
      //set the logical expression array for edit
      this.set('ExpArrayForEdit',selectedExp.get('link'));

      //display the edit model
      Ember.$('.ui.modal.logicalExpEdit').modal({detachable: false,}).modal('show');

      this.set('selectedCourse',splitedExp[0]);
      this.set('selectedBool',splitedExp[1]);
      this.set('selectedAessmentCode',selectedExp.get('comment'));
      this.set('selectedLogicalExp',null);
      this.set('selectedlogicalLink',selectedExp.get('logicalLink'));
      this.set('inputValue',this.get('markForEdit'));
    },


    //construct and post the new logical expresion object to the backend
    saveLogicalExpChanges(){
      var self = this;
      //if number field is visiable assign the value otherwise keep it null
      var numberFieldValue = "";
      if(this.get('numberFieldVisable'))
      {
        numberFieldValue = this.get('markForEdit');
      }
      var booleanValue = this.get('selectedBool');
      if(booleanValue == "null" || booleanValue == null)
      {
        alert("You must select an operator!");
        //this.set('errorMsg',"You must select an operator!" );
      }
      else if (this.get('numberFieldVisable') && this.get('markForEdit')==null && this.get('markForEdit')=="")
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
        let combinedExp = this.get('selectedCourse')+"  "+this.get('selectedBool')+"  "+numberFieldValue;
        let logicalLink = this.get('selectedlogicalLink');
        //if selectedAessmentCode is not null find the object in local cache, if null tempcode will be null as well since nothing found
        let tempCode = this.get('store').peekRecord('assessment-code',this.get('selectedAessmentCode'));

        let updatedExp = this.get('loigcalExpForEdit');
        updatedExp.set('booleanExp',combinedExp);
        updatedExp.set('logicalLink',logicalLink);
        updatedExp.set('comment',tempCode);
        console.log(updatedExp.get('link').get('length'));
        updatedExp.save().then(function(record){

          //clear all selected values
          self.set('selectedCourse',null);
          self.set('selectedBool',null);
          self.set('selectedAessmentCode',null);
          self.set('selectedLogicalExp',null);
          self.set('selectedlogicalLink',"");
          self.set('inputValue',null);
          self.set('numberFieldVisable',false);

          self.set('loigcalExpForEdit',null);
          self.set('courseForEdit',null);
          self.set('operatorForEdit',null);
          self.set('markForEdit',null);
          self.set('linkForEdit',null);
          self.set('assessmentForEdit',null);
          self.set('ExpArrayForEdit',null);
           Ember.$('.ui.modal.logicalExpEdit').modal('hide');
         });
      }
    },

    deleteSelectedEditExp(selectedExp){
      //delete the selectedExp from the ExpArrayForEdit
      this.get('ExpArrayForEdit').removeObject(selectedExp);
    },

    closeLogicalExpEditModal(){
      //clear all selected values
      this.set('selectedCourse',null);
      this.set('selectedBool',null);
      this.set('selectedAessmentCode',null);
      this.set('selectedLogicalExp',null);
      this.set('selectedlogicalLink',"");
      this.set('inputValue',null);
      this.set('numberFieldVisable',false);

      this.set('loigcalExpForEdit',null);
      this.set('courseForEdit',null);
      this.set('operatorForEdit',null);
      this.set('markForEdit',null);
      this.set('linkForEdit',null);
      this.set('assessmentForEdit',null);
      this.set('ExpArrayForEdit',null);

      Ember.$('.ui.modal.logicalExpEdit').modal('hide');
    },
  },
});
