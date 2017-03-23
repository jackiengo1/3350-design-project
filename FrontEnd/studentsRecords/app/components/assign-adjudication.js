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

  test: null,

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
      limit: 10,
      offset: 0,
    }).then(function (records) {
      self.set('studentModel', records);
    });
  },

  actions:{
    //for each student, put all course (throught different terms) into a single array for that student
    orgainzeStudentCourses(){
      var allStudents = this.get('studentModel');
      var allterms = this.get('termModel');
      //for(let i=0;i<allStudents.get('length');i++)
      //{
        //variable used to store the all courses for a single student
        var studentcourseArray = [];
        //search through the term with the student number
      //  for(let j=0;j<allterms.get('length');j++)
    //    {
          this.get('store').query('term', allStudents.objectAt(0).get('id'));
          this.set('test', allStudents.objectAt(0).get('semester'));

          console.log(this.get('test'));
//!<<<<<<<<<<<this part need debug, allterms.objectAt(j).get('studentInfo') is always null
//in addition, if i do this.get('student').get('semester') the returned array has zero length


          //if the student object equal to the student reference in term
      /*      if(allStudents.objectAt(i).get('id')== allterms.objectAt(j).get('studentInfo').get('id'))
            {
              console.log(1);
              //get all courses in that term
              var termCourses = allterms.objectAt(j).get('courseInfo');
              //for each termcourses, add it to the student course array
              for(let k=0;k<termCourses.get('length');k++)
              {
                //always append the termcourse obj to the end of student course array
                studentcourseArray[studentcourseArray.get('length')] = termCourses.objectAt(k);
              //  console.log(termCourses.objectAt(k));
              }
            }*/
        //}
        //after checking through all terms for the current student, add the student course array (including all courses cross terms) to the ember course array
        //this.get('studentTermArray').pushObject(studentcourseArray);
    //  }
      //for(let i=0;i<this.get('studentTermArray').get('length');i++)
      //{console.log(this.get('studentTermArray').objectAt(i));}
      //after this function call, call the adjudicationStudent function
      //this.send('adjudicationStudent');
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
        //!>>>>>>Pay attention to the logical link array, the first element [0] is "", starting from the second one is the actual and/or
        let logicalLinkArray = currentlogicExp.get('logicalLink');
        //logicalExpArray is sth like a>50, b Required...etc has to be splited
        var expressionCourseArray = [];//this array hold the course name in the logical exp
        var expressionBooleanArray =[];//this array hold the
        var expressionNumberArray = [];
        var requiredCourseArray= [];
        //for each logical exp inside the logcal exp array
        for(let j=0;j<logicalExpArray.get('length');j++)
        {
          let currentExp = logicalExpArray.objectAt(j); //currentexp is a string including a>b ...etc
          let splitedExp = currentExp.split("-"); //split with "-" <-this is manually added in the logical expression class for easy separation
          //check if the course is a required course  [0] should be the course name [1] is the operator [2]if exist is the value
          if(splitedExp[1] === "Required")
          {
            //if the course is required only add it to requiredCourseArray so the exp arrays always have correct index corresponding
            requiredCourseArray[requiredCourseArray.length] = splitedExp[0];
          }
          else{
            //if the course is not required, it has some value requirement, add the value into the corresponding arrays
            expressionCourseArray[expressionCourseArray.length] = splitedExp[0];
            expressionBooleanArray[expressionBooleanArray.length] = splitedExp[1];
            expressionNumberArray[expressionNumberArray.length] = splitedExp[2];
          }
        }
      }
    },



  }

});
