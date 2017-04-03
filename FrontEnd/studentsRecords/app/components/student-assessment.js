import Ember from 'ember';
import pdfMake from 'ember-pdfmake';

export default Ember.Component.extend({
  /*global XLSX*/
  store: Ember.inject.service(),

  studentModel: null,
  currentStudent: null,
  currentStudentTerms: null,
  adjudicationModel: null,
  adjudicationcategoryModel: null,
  assessmentCodeModel: null,

  currentStudentAdjudications: null,
  currentStudentCourses: [],
  currentStudentGrades: [],
  currentStudentLogicalExp: null,
  currentStudentAssessmentCode: null,


  evalString: "",
  firstExp: true,

  categoryName: null,
  categoryCode: null,

  categoryEditObj: null,
  categoryNameEdit: null,
  categoryCodeEdit: null,
  selectedCode: null,



  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').query('student', {
      limit: 1000,
      offset: 0
    }).then(function (records) {
      self.set('studentModel', records);
    });

    this.get('store').findAll('adjudication').then(function(records){
      self.set('adjudicationModel', records);
    });

    this.get('store').findAll('adjudication-category').then(function(records){
      self.set('adjudicationcategoryModel', records);
    });

    this.get('store').findAll('assessment-code').then(function(records){
      self.set('assessmentCodeModel', records);
    });

    this.get('store').findAll('term'); //load terms into the store
    this.get('store').findAll('course-code'); //load course codes into the store
    this.get('store').findAll('grade'); //load grades into the store
    this.get('store').findAll('logical-expression'); //load logical expressions

  },


  didRender() {
    Ember.$('.menu .item').tab();
  },




//go to the next student, and loads all of there courses, grades, and adjudications
  getNextStudent: function(index){
    var self = this;
    this.set('currentStudent', this.get('studentModel').objectAt(index));
    this.set('currentStudentTerms', this.get('currentStudent').get('semester'));
    this.set('currentStudentAdjudications', this.get('currentStudent').get('adjudicationInfo'));

    this.get('currentStudentTerms').forEach(function (term) { //for each term get the course info
      term.get('courseInfo').forEach(function (course) {  //for each course
        self.get('currentStudentCourses').push(course); //push it into an array
        self.get('currentStudentGrades').push(course.get('mark').get('mark')); //push mark into the array
      });
    });
  },






  parseLogicalExpTree: function(logicalExpTree){

    var courseFound = false;
    var expString = logicalExpTree.get('booleanExp'); //logical exp string
    var logicalLink = logicalExpTree.get('logicalLink'); //AND or OR
    expString = expString.split("  ");
    var expArray = logicalExpTree.get('link'); //array of logical exps
    var criteria = expString[0]; // course or w.e to be evaluated
    var operator = expString[1];
    var inputValue = expString[2]; //input value

    this.get('currentStudentCourses').forEach(function(course){ //loop through student courses
      if(criteria[0] == course.get('name') && courseFound == false){ //if course name matches
        courseFound = true;
        if(operator == "="){ //check operator
          if(course.get('mark').get('mark') == inputValue){
            this.set('evalString', this.get('evalString') + "true"); //appends true to the evalString
          }
        }
        else if(operator == "<"){
          if(course.get('mark').get('mark') < inputValue){
            this.set('evalString', this.get('evalString') + "true");
          }
          else{
            this.set('evalString', this.get('evalString') + "false");
          }
        }
        else if(operator == "<="){
          if(course.get('mark').get('mark') <= inputValue){
            this.set('evalString', this.get('evalString') + "true");
          }
          else{
            this.set('evalString', this.get('evalString') + "false");
          }
        }
        else if(operator == ">"){
          if(course.get('mark').get('mark') > inputValue){
            this.set('evalString', this.get('evalString') + "true");
          }
          else{
            this.set('evalString', this.get('evalString') + "false");
          }
        }
        else if(operator == ">="){
          if(course.get('mark').get('mark') >= inputValue){
            this.set('evalString', this.get('evalString') + "true");
          }
          else{
            this.set('evalString', this.get('evalString') + "false");
          }
        }
        else if(operator == "REQUIRED"){
          this.set('evalString', this.get('evalString') + "true");
        }//end else if
      }//end if
    });//end forEach

    if(courseFound == false && operator == "REQUIRED"){
      this.set('evalString', this.get('evalString') + "false");
    }



    if(logicalLink == "AND"){
      this.set('evalString', this.get('evalString') + "&&");
    }
    else if(logicalLink == "OR"){
      this.set('evalString', this.get('evalString') + "||");
    }


    if(expArray != null){ //if there is a logical exp array
      if(this.get("firstExp")){ //if it is the first logical exp, don't warp in brackets
        this.set('firstExp', false);
        expArray.forEach(function(logicalExp){ //recursively loop through logical exps
          this.parseLogicalExpTree(logicalExp);
        });
      }//end if
      else{ //if we are not dealing with the first logcial exp, warp in brackets
        this.set('evalString', this.get('evalString') + "(");
        expArray.forEach(function(logicalExp){ //recursively loop through logical exps
          this.parseLogicalExpTree(logicalExp);
        });
        this.set('evalString', this.get('evalString') + ")");
      }//end else
    }//end if
  },






  actions: {

    adjudicateStudents(){

      for(var i = 0; i < this.get('studentModel').get('length'); i++){
        this.set('evalString', ""); //clear evalString for next student
        this.set('firstExp', true);
        //takes in an index for a student in the student model.
        //puts the student's current courses and grades into separate arrays
        //also gets the student's adjudication and logical expressions for each assessment code
        this.getNextStudent(i);

        //need to call parseLogicalExpTree function here
        this.get('currentStudentAdjudications').forEach(function(adjudication){
          var adjudicationCategory = adjudication.get('adjudicationCategory');
          var assessmentCode = adjudicationCategory.get('assessmentCode');
          var logicalExp = assessmentCode.get('testExpression');

          this.parseLogicalExpTree(logicalExp);

          if(eval(this.get('evalString'))){
            adjudicationCategory.set('result', "PASS");
            adjudicationCategory.save();

          }
          else{
            adjudicationCategory.set('result', "FAIL");
            adjudicationCategory.save();
          }

        });

      }//end for

      //at the very end, the evalString should look something like this
      //console.log(eval("false&&true||false&&true(true||false||true)&&true||false"));
    },


    openCategoryAdd(){
      Ember.$('.ui.modal.categoryAdd').modal({ detachable: false, closable: false }).modal('show');
    },

    closeCategoryAdd(){
      Ember.$('.ui.modal.categoryAdd').modal('hide');
    },



    openCategoryEdit(category){
      this.set('categoryEditObj', category);
      this.set('categoryNameEdit', category.get('name'));
      Ember.$('.ui.modal.categoryEdit').modal({ detachable: false, closable: false }).modal('show');
    },

    closeCategoryEdit(){
      Ember.$('.ui.modal.categoryEdit').modal('hide');
    },

    addCategory(){
      var newCategory = this.get('store').createRecord('adjudication-category', { //create a new category record
        name: this.get('categoryName'),
        assessmentCode: this.get('selectedCode')
      });

      newCategory.save();
      Ember.$('.ui.modal.categoryAdd').modal('hide');
    },


    editCategory(){
      var updatedCategory = this.get('categoryEditObj');
      updatedCategory.set('name', this.get('categoryNameEdit'));
      updatedCategory.set('assessmentCode', this.get('selectedCode'));
      updatedCategory.save();
      Ember.$('.ui.modal.categoryEdit').modal('hide');
    },

    deleteCategory(category){
      category.deleteRecord();
      category.save();
    },

    selectCode(code){
    var selectedCode = this.get('store').peekRecord('assessment-code', code);
      this.set('selectedCode', selectedCode);
      console.log(this.get('selectedCode'));
    },



    generatePDFs(){

      var body = [];
      var col = [];

      col.pushObject("Student Number");
      col.pushObject("Assessment Code");
      body.pushObject(col);

      col = [];

      for(let i = 0; i < this.get('studentModel').get('length'); i++){

        this.get('store').query('adjudication', { filter: { student: this.get('studentModel').objectAt(i).get('id') } });
        this.set('currentStudentAdjudications', this.get('studentModel').objectAt(i).get('adjudicationInfo'));

        for(let j = 0; j < this.get('currentStudentAdjudications').get('length'); j++){
          col = [];
          col.pushObject(this.get('studentModel').objectAt(i).get('number'));
          if(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name') == undefined){
            col.pushObject("undefined");
          }
          else{
            col.pushObject(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name'));
          }

          console.log(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name'));
          body.pushObject(col);
        }
      }


      var pdfBody = body;


      var softwareDocDefinition = {
        info: {
          title: 'Assessment Results',
          author: 'Genesis Ideas',
          subject: 'Student Assessment',
          keywords: 'Assessment',
        },
        content: [
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*', '*'],

              body: pdfBody
            }
          }
        ]
      };
      pdfMake.createPdf(softwareDocDefinition).open();
    },

    generateExcelFiles(){

      var body = [];
      var col = [];

      col.pushObject("Student Number");
      col.pushObject("Assessment Code");
      body.pushObject(col);

      col = [];

      for(let i = 0; i < this.get('studentModel').get('length'); i++){

        this.get('store').query('adjudication', { filter: { student: this.get('studentModel').objectAt(i).get('id') } });
        this.set('currentStudentAdjudications', this.get('studentModel').objectAt(i).get('adjudicationInfo'));

        for(let j = 0; j < this.get('currentStudentAdjudications').get('length'); j++){
          col = [];
          col.pushObject(this.get('studentModel').objectAt(i).get('number'));
          if(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name') == undefined){
            col.pushObject(null);
          }
          else{
            col.pushObject(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name'));
          }

          console.log(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name'));
          body.pushObject(col);
        }
      }

      /* original data */
      var data = body;

      var ws_name = "SheetJS";

      /* set up workbook objects -- some of these will not be required in the future */
      var wb = {}
      wb.Sheets = {};
      wb.Props = {};
      wb.SSF = {};
      wb.SheetNames = [];

      /* create worksheet: */
      var ws = {}

      /* the range object is used to keep track of the range of the sheet */
      var range = {s: {c:0, r:0}, e: {c:0, r:0 }};

      /* Iterate through each element in the structure*/
      for(var R = 0; R != data.length; ++R) {
        if(range.e.r < R) range.e.r = R;
        for(var C = 0; C != data[R].length; ++C) {
          if(range.e.c < C) range.e.c = C;

          /* create cell object: .v is the actual data */
          var cell = { v: data[R][C] };
          if(cell.v == null) continue;

          /* create the correct cell reference */
          var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

          /* determine the cell type */
          if(typeof cell.v === 'number') cell.t = 'n';
          else if(typeof cell.v === 'boolean') cell.t = 'b';
          else cell.t = 's';

          /* add to structure */
          ws[cell_ref] = cell;
        }
      }
      ws['!ref'] = XLSX.utils.encode_range(range);

      /* add worksheet to workbook */
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;

      var wopts = { bookType:'xlsx', bookSST:false, type:'binary'};

      /* write file */
      var wbout = XLSX.write(wb, wopts);

      saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "Assessment Result.xlsx");


    },

  }

});







function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
