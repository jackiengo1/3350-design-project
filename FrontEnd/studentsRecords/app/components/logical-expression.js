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
  logicalDBExpArray:Ember.A(),
  logicalDBLinkArray:Ember.A(),
  editDemo:null,
  editDemoArray:Ember.A(),
  editDBExp:null,
  editDBLink:null,
  editDBAssess:null,

  errorMsg: "",

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
      if(records.get('length')>0){
        for(let i=0;i<records.get('length');i++)
        {
          let ExpTemp = records.objectAt(i).get('booleanExp');
          let linkTemp = records.objectAt(i).get('logicalLink');
          //add exp array and link array to local list
          self.get('logicalDBExpArray').pushObject(ExpTemp);
          self.get('logicalDBLinkArray').pushObject(linkTemp);
          var combinedExpArray =[];
          for(let j=0;j<ExpTemp.length;j++)
          {
            let combinedExp;
            //combine exp and link to make demo array
            combinedExp = linkTemp[j]+" "+ExpTemp[j];
            //add the string to the combined array
            combinedExpArray[combinedExpArray.length]=combinedExp;
          }
          self.get('logicalDBDemoArray').pushObject(combinedExpArray);
        }
      }
    });
  },

  didRender() {
    Ember.$('.menu .item').tab();
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
         //alert("You must select an operator!");
         this.set('errorMsg',"You must select an operator!" );
       }
       else if (this.get('numberFieldVisable') && this.get('inputValue')==null && this.get('inputValue')=="")
       {
         //alert("Number field can not be empty!");
         this.set('errorMsg',"Number field can not be empty!");
       }
       else if(this.get('showLogic')&& this.get('selectedlogicalLink')=="")
       {
         //alert("Logical Link can not be empty!");
         this.set('errorMsg',"Logical Link can not be empty!");
       }
       else{
         var courseValue = this.get('store').peekRecord('course-code',this.get('selectedCourse')).get('name');
         //combine the course boolean value into a single string
         var booleanExpString = courseValue+"-"+booleanValue+"-"+numberFieldValue;
         //after adding the first expression, show the logical link area
         this.set('showLogic',true);
         //if this is not the first run, add the logic link to the logical link array
         if(this.get('showLogic'))
         {
           let logiclinktemp = this.get('selectedlogicalLink');
           this.get('logicalLinkArray').pushObject(logiclinktemp);
           let expDemostring = logiclinktemp+"-"+booleanExpString;
           this.get('logicalDemoArray').pushObject(expDemostring);
         }

         if(!this.get('showLogic'))
         {
           //for first expression only add the expression to the demo array
           this.get('logicalDemoArray').pushObject(booleanExpString);
         }
         //add the expession string into logical expression array
         this.get('logicalExpArray').pushObject(booleanExpString);
         this.set('errorMsg',"");
         Ember.$('.ui.modal.logicalExp').modal('hide');
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
        var demoTemp = this.get('logicalDemoArray');
        for(let i=0;i<demoTemp.get('length');i++)
        {
          if(oneDemo == demoTemp.objectAt(i))
          {
            //if the index is zero, then only pop from demo and logic exp array, do not touch the link array
            this.get('logicalDemoArray').removeAt(i);
            this.get('logicalExpArray').removeAt(i);
            //if the index is not zero remove the link array i-1, since link array always has one element less then the other two (first round doesn't add the link)
            this.get('logicalLinkArray').removeAt(i);
            //only find the first one if there is a duplication, after that break out the loop
            break;
          }
        }
    },

    //function used to delete the logical expression from the db
    deleteDBExp(oneDemo){
      //first search throught the demo array to find the index
        var demoTemp = this.get('logicalDBDemoArray');
        for(let i=0;i<demoTemp.get('length');i++)
        {
          if(oneDemo == demoTemp.objectAt(i))
          {
            let templogicholder =this.get('logicalExpModel').objectAt(i);
            templogicholder.deleteRecord();
            templogicholder.save();
            this.get('logicalDBDemoArray').removeAt(i);
            break;
          }
        }
    },

    // //function used to edit the logical expression
    // editExp(oneDemo){
    //   //first search throught the demo array to find the index
    //   var demoTemp = this.get('logicalDBDemoArray');
    //   for(let i=0;i<demoTemp.get('length');i++)
    //   {
    //     if(oneDemo == demoTemp.objectAt(i))
    //     {
    //       //get all exp and link corresponding to the selected index
    //       let tempExp = this.get('logicalDBExpArray').objectAt(i);
    //       let tempLink = this.get('logicalDBLinkArray').objectAt(i);
    //       //get the logical exp
    //       let tempassess = this.get('logicalExpModel').objectAt(i).get('comment');
    //       this.set('editDBAssess',tempassess);
    //       for(let j=0;j<tempExp.length;j++)
    //       {
    //         let combinedExp;
    //         //combine exp and link to make demo array
    //         combinedExp = tempLink[j]+" "+tempExp[j];
    //         //add the string to the combined array
    //         this.get('editDemoArray').pushObject('combinedExp');
    //       }
    //       break;
    //     }
    //   }
    // },


    // editDBExp(oneDemo){
    //   //search throught the list of combined edit demo array find the index of the selected object
    //   var demoTemp = this.get('editDemoArray');
    //   for(let i=0;i<demoTemp.get('length');i++)
    //   {
    //     if(oneDemo == demoTemp.objectAt(i))
    //     {
    //       let splited = oneDemo.split(" ");
    //     }
    //   }
    // },

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
    },

    openLogicalExpModal(){
      this.set('inputValue', null);
      Ember.$('.ui.modal.logicalExp').modal('show');
    },

    closeLogicalExpModal(){
      Ember.$('.ui.modal.logicalExp').modal('hide');
    },
  }
});
