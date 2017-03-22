import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  //models directly get from db
  studentModel: null,
  termModel:null,
  termCodeModel:null,
  courseCodeModel:null,
  gradeModel:null,
  adjudicationModel:null,
  assessmentCodeModel:null,
  logicalExpModel:null,

  //array used to organize local data
  studentTermArray:Ember.A(),

  init() {
    this._super(...arguments);
    //init function get all models from the db
    var self = this;

    this.get('store').findAll('term-code').then(function (records) {
      self.set('termCodeModel', records);
    });


    this.get('store').findAll('course-code').then(function (records) {
      self.set('courseCodeModel', records);
    });

    this.get('store').findAll('term').then(function(records){
      self.set('termModel',records);
    });

    this.get('store').findAll('grade').then(function(records){
      self.set('gradeModel',records);
    });

    this.get('store').findAll('adjudication').then(function(records){
      self.set('adjudicationModel',records);
    });

    this.get('store').findAll('assessment-code').then(function(records){
      self.set('assessmentCodeModel',records);
    });

    this.get('store').findAll('logical-expression').then(function(records){
      self.set('logicalExpModel',records);
    });

    this.get('store').query('student', {
      limit: 999999,
      offset: 0,
    }).then(function (records) {
      self.set('studentModel', records);
    });
  },

  action:{
    //for each student, put all course (throught different terms) into a single array for that student
    orgainzeStudentCourses(){
      var allStudents = this.get('studentModel');
      var allterms = this.get('termModel');
      for(let i=0;i<allStudents.get('length');i++)
      {
        //variable used to store the all courses for a sinle student
        var studentcourseArray = [];
        //search through the term with the student number
        for(let j=0;j<allterms.get('length');j++)
        {
          //if the student object equal to the student reference in term
            if(allStudents.objectAt(i)== allterms.objectAt(j).get('studentInfo'))
            {
              //get all courses in that term
              var termCourses = allterms.objectAt(j).get('courseInfo');
              //for each termcourses, add it to the student course array
              for(let k=0;k<termCourses.get('length');k++)
              {
                //always append the termcourse obj to the end of student course array
                studentcourseArray[studentcourseArray.get('length')] = termCourses.objectAt(k);
              }
            }
        }
        //after checking through all terms for the current student, add the student course array (including all courses cross terms) to the ember course array
        this.get('studentTermArray').pushObject(studentcourseArray);
      }
    },

    adjudicationStudent()
    {
      //for each assessment code, split it first, and then, checking through each student's course array to see if the student is qualified for that code
      var allAssessmentCode = this.get('assessmentCodeModel');
      for(let i=0;i<allAssessmentCode.get('length');i++)
      {
        let currentAssCode = allAssessmentCode.objectAt(i);
        let currentlogicExp = currentAssCode.get('testExpression');
        let logicalExpArray = currentlogicExp.get('booleanExp');
        let logicalLinkArray = currentlogicExp.get('logicalLink');
        //logicalExpArray is sth like a>50, b Required...etc has to be splited
        var expressionCourseArray = [];
        var expressionBooleanArray =[];
        var expressionNumberArray = [];
        //for each logical exp inside the logcal exp array
        for(let j=0;j<logicalExpArray.get('length');j++)
        {
          let currentExp = logicalExpArray.objectAt(j); //currentexp is a string including a>b ...etc
          let splitedExp = currentExp.split("-"); //split with "-" <-this is manually added in the logical expression class for easy separation
          
        }
      }
    },

  }

});
