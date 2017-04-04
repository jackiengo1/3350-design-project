import Ember from 'ember';
import pdfMake from 'ember-pdfmake';

export default Ember.Component.extend({
  /*global XLSX*/
  store: Ember.inject.service(),

  studentModel: null,
  currentTerm: null,
  adjudicationModel: null,
  adjudicationcategoryModel: null,
  assessmentCodeModel: null,

  currentStudentAdjudications: null,
  currentCourses: [],
  currentGrades: [],
  currentStudentLogicalExp: null,
  currentStudentAssessmentCode: null,

  currentAdjudication: null,
  currentAdjudicationCategory: null,


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

    //this.get('store').findAll('term'); //load terms into the store
    this.get('store').findAll('course-code'); //load course codes into the store
    this.get('store').findAll('grade'); //load grades into the store
    this.get('store').findAll('logical-expression'); //load logical expressions

  },


  didRender() {
    Ember.$('.menu .item').tab();
  },




//go to the next student, and loads all of there courses, grades, and adjudications
  getNextAdjudication: function(index){
    var self = this;

    console.log('get');
    this.set('currentAdjudication', this.get('adjudicationModel').objectAt(index));
  //  this.set('currentAdjudicationCategory', this.get('currentAdjudication').get('adjudicationCategory'));
    //console.log(this.get('currentAdjudication'));
    this.set('currentTerm', this.get('currentAdjudication').get('semester'));
    //console.log(this.get('currentTerm'));
    this.get('currentTerm').get('courseInfo').forEach(function(course){
      self.get('currentCourses').push(course);
      self.get('currentGrades').push(course.get('mark').get('mark'));
    });
  },






  parseLogicalExpTree: function(logicalExpTree){

    var courseFound = false;
    var expString = logicalExpTree.get('booleanExp'); //logical exp string
    var logicalLink = logicalExpTree.get('logicalLink'); //AND or OR
    //console.log(expString);
    expString = expString.split("  ");
    var expArray = logicalExpTree.get('link'); //array of logical exps
    var criteria = expString[0]; // course or w.e to be evaluated
    //console.log(criteria);
    var operator = expString[1];
    var inputValue = expString[2]; //input value
    var self = this;

  //  console.log("operator: 1" + criteria + "1");
    //console.log(operator.equals("<="));

    this.get('currentCourses').forEach(function(course){ //loop through student courses
    //  console.log(course.get('name') + " - " + course.get('mark').get('mark'));
      var mark = course.get('mark').get('mark');
      console.log(mark + " - " + course.get('mark').get('mark'));
      if(criteria == course.get('name') && courseFound == false){ //if course name matches
        courseFound = true;
        if(operator == "="){ //check operator
          if(parseInt(course.get('mark').get('mark')) == inputValue){
            self.set('evalString', self.get('evalString') + "true"); //appends true to the evalString
          }
        }
        else if(operator == "<"){
          if(parseInt(course.get('mark').get('mark')) < inputValue){
            self.set('evalString', self.get('evalString') + "true");
          }
          else{
            self.set('evalString', self.get('evalString') + "false");
          }
        }
        else if(operator == "<="){
          if(parseInt(course.get('mark').get('mark')) <= inputValue){
            self.set('evalString', self.get('evalString') + "true");
          }
          else{
            self.set('evalString', self.get('evalString') + "false");
          }
        }
        else if(operator == ">"){

          console.log(mark + " - " + inputValue);
          if(parseInt(course.get('mark').get('mark')) > inputValue){
            self.set('evalString', self.get('evalString') + "true");
          }
          else{
            self.set('evalString', self.get('evalString') + "false");
          }
        }
        else if(operator == ">="){
          if(parseInt(course.get('mark').get('mark')) >= inputValue){
            self.set('evalString', self.get('evalString') + "true");
          }
          else{
            self.set('evalString', self.get('evalString') + "false");
          }
        }
        else if(operator == "REQUIRED"){
          self.set('evalString', self.get('evalString') + "true");
        }//end else if
      }//end if
    });//end forEach

    if(courseFound == false && operator == "REQUIRED"){
      self.set('evalString', self.get('evalString') + "false");
    }



    if(logicalLink == "and"){
      self.set('evalString', self.get('evalString') + "&&");
    }
    else if(logicalLink == "or"){
      //var string = this.get('evalString') + "||";
      self.set('evalString', self.get('evalString') + "||");
    }

  //  console.log("eval string: " + this.get('evalString'));

    //console.log(expArray.get('length'));
    //console.log(expArray.objectAt(0).get('booleanExp'));
    if(expArray.get('length') != 0){ //if there is a logical exp array
      if(this.get("firstExp")){ //if it is the first logical exp, don't warp in brackets
        this.set('firstExp', false);
        expArray.forEach(function(logicalExp){ //recursively loop through logical exps
        //  console.log('one');
          self.parseLogicalExpTree(logicalExp);
        });
      }//end if
      else{ //if we are not dealing with the first logcial exp, warp in brackets
        this.set('evalString', this.get('evalString') + "(");
        expArray.forEach(function(logicalExp){ //recursively loop through logical exps
          self.parseLogicalExpTree(logicalExp);
        });
        this.set('evalString', this.get('evalString') + ")");
      }//end else
    }//end if
  },






  actions: {

    adjudicateStudents(){

      for(var i = 0; i < this.get('adjudicationModel').get('length'); i++){
        this.set('evalString', ""); //clear evalString for next student
        this.set('firstExp', true);
        //takes in an index for a student in the student model.
        //puts the student's current courses and grades into separate arrays
        //also gets the student's adjudication and logical expressions for each assessment code
        this.getNextAdjudication(i);

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


    testAsssessmentCode(){
      var self = this;
      //var assessmentCode = this.get('assessmentCodeModel').objectAt(1);

      for(var i = 0; i < this.get('adjudicationModel').get('length'); i++){

        this.getNextAdjudication(i);
        var assessmentCodeList = this.get('assessmentCodeModel');
        for(var j = 0; j < assessmentCodeList.get('length'); j++){
          var testExp = assessmentCodeList.objectAt(j).get('testExpression');
          for(var k = 0; k < testExp.get('length'); k++){
            console.log('herer');
            self.set('evalString', ""); //clear evalString for next student
            self.set('firstExp', true);
            console.log(testExp.objectAt(k));
            self.parseLogicalExpTree(testExp.objectAt(k));
            console.log(self.get('evalString'));
            console.log(eval(self.get('evalString')));
            if(eval(self.get('evalString'))){
              var currentAdj = self.get('currentAdjudication');
              console.log(assessmentCodeList.objectAt(j).get('name'));
              currentAdj.set('comment', assessmentCodeList.objectAt(j));
              currentAdj.save().then(function(){
                console.log(currentAdj);
                console.log(currentAdj.get('comment').get('name'));
              });

              break;
            }
          }
        }

      /*  this.getNextAdjudication(i);
        this.get('assessmentCodeModel').forEach(function(code){
          code.get('testExpression').forEach(function(exp){
            self.set('evalString', ""); //clear evalString for next student
            self.set('firstExp', true);
            console.log(exp);
            self.parseLogicalExpTree(exp);
          //  console.log(self.get('evalString'));
          //  console.log(eval(self.get('evalString')));
            if(eval(self.get('evalString'))){
              var currentAdj = self.get('currentAdjudication');
              currentAdj.set('comment', code);
              currentAdj.save();
            }
          });
        });*/
      }



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

        //this.get('store').query('adjudication', { filter: { student: this.get('studentModel').objectAt(i).get('id') } });
        this.set('currentStudentAdjudications', this.get('studentModel').objectAt(i).get('adjudicationInfo'));
        console.log(this.get('currentStudentAdjudications').get('length'));
        for(let j = 0; j < this.get('currentStudentAdjudications').get('length'); j++){
          col = [];
          col.pushObject(this.get('studentModel').objectAt(i).get('number'));
          console.log("a: " + this.get('currentStudentAdjudications').get('comment'));
          if(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name') == undefined){
            col.pushObject("undefined");
          }
          else{
            col.pushObject(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name'));
          }

          //console.log(this.get('currentStudentAdjudications').objectAt(j).get('comment').get('name'));
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
