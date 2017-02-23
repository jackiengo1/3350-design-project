import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  /* golbal XLSX */
  residencyModel:null,
  advancedStandingModel:null,
  scholarshipAwardModel:null,
  genderModel:null,
  studentModel:null,
  hsCourseGradeModel:null,
  highSchoolCourseModel:null,
  secondarySchoolModel:null,
  highSchoolSubjectModel:null,
  gradeModel:null,
  courseCodeModel:null,
  planCodeModel:null,
  programRecordModel:null,
  termCodeModel:null,

  init() {
    this._super(...arguments);
    var self = this;
    // load Residency data model
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
    });

    // load advanced standing model
    this.get('store').findAll('advanced-standing').then(function (records) {
      self.set('advancedStandingModel', records);
      console.log(Ember.inspect(records));
    });

    //load scholarship Award model
    this.get('store').findAll('scholarship-award').then(function (records) {
      self.set('scholarshipAwardModel', records);
      console.log(Ember.inspect(records));
    });

    this.get('store').findAll('gender').then(function(records){
      self.set('genderModel', records);
    });

    this.get('store').findAll('student').then(function(records){
      self.set('studentModel', records);
    });

    this.get('store').findAll('hscourse-grade').then(function(records){
      self.set('hsCourseGradeModel', records);
    });

    this.get('store').findAll('high-school-course').then(function(records){
      self.set('highSchoolCourseModel', records);
    });

    this.get('store').findAll('secondary-school').then(function(records){
      self.set('secondarySchoolModel', records);
    });

    this.get('store').findAll('high-school-subject').then(function(records){
      self.set('highSchoolSubjectModel', records);
    });

    this.get('store').findAll('grade').then(function(records){
      self.set('gradeModel', records);
    });

    this.get('store').findAll('program-record').then(function(records){
      self.set('programRecordModel', records);
    });

    this.get('store').findAll('course-code').then(function(records){
      self.set('courseCodeModel', records);
    });

    this.get('store').findAll('plan-code').then(function(records){
      self.set('planCodeModel', records);
    });

    this.get('store').findAll('term-code').then(function(records){
      self.set('termCodeModel', records);
    });

  },


  actions:{
    fileLoaded: function(file) {
      var self = this;
      var workbook = XLSX.read(file.data, {type: 'binary'});
      var sheet_name_list = workbook.SheetNames;
      if(file.name === "genders.xlsx")
      {
        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          for (var cellName in worksheet) {
            //all keys that do not begin with "!" correspond to cell addresses

            if (cellName[0] === '!') {
              continue;
            }
            if(worksheet[cellName].v !== "name")
            {
              var newgender = self.get('store').createRecord('gender',{
                name: worksheet[cellName].v,
              });
              newgender.save();
            }
          }

        });
      }

      else if (file.name ==="residencies.xlsx")
      {
        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          for (var cellName in worksheet) {
            //all keys that do not begin with "!" correspond to cell addresses

            if (cellName[0] === '!') {
              continue;
            }
            if(worksheet[cellName].v !== "name")
            {
              var newresidency = self.get('store').createRecord('residency',{
                name: worksheet[cellName].v,
              });
              newresidency.save();
            }
          }

        });
      }

      else if (file.name ==="termcodes.xlsx")
      {
        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];
          for (var cellName in worksheet) {
            //all keys that do not begin with "!" correspond to cell addresses

            if (cellName[0] === '!') {
              continue;
            }
            if(worksheet[cellName].v !== "name")
            {
              var newtermcode = self.get('store').createRecord('term-code',{
                name: worksheet[cellName].v,
              });
              newtermcode.save();
            }
          }

        });
      }

      else if(file.name ==="AdmissionComments.xlsx")
      {
        sheet_name_list.forEach(function (sheetName) {
          var indexA=0; var indexB=0; var Aarray = []; var Barray = []; var lastTimeA = false;
          var worksheet = workbook.Sheets[sheetName];
          for (var cellName in worksheet) {
            //all keys that do not begin with "!" correspond to cell addresses
            if (cellName[0] === '!') {
              continue;
            }
            //skip the first 2 cells (0 and 1) with the cell name
            if(indexA <1){
              indexA++;
              continue;
            }
            if(indexB<1)
            {
              indexB++;
              continue;
            }
            //for the first colume where cell name start with A
            if(cellName[0] === "A")
            {
              Aarray[indexA] = worksheet[cellName].v;
              //keep track of the type of cell for the last run
              lastTimeA = true;
              //increment indexA
              indexA++;
            }
            //for the second colume where cell name start with B
            if (cellName[0] === "B")
            {
              if(lastTimeA)
              {
                Barray[indexB] = worksheet[cellName].v;
              }
              else{
                //in this case the last cell is a b cell not an A cell, so the index should be decrement
                //means this is still the same note with the previous one
                indexB--;
                Barray[indexB] += "\n"+worksheet[cellName].v;
              }
              //means the lasttime is a b cell
              lastTimeA = false;
              indexB++;
            }
          }

          for(var i=1;i<indexA;i++)
          {
            var test= Barray[i];
            //console.log(test);
            self.get('store').query('student', {
              findStudentNum: Aarray[i]
            }).then(function (student) {
              //a bug here for some reason the test will become none found, however out side the call back function it works just fine
              //in addition it's not adding new colume to existing student
              student.set('admissionComments',Barray[i]);
              student.save();
            });

          }
         });
    }

    else if(file.name === "HighSchools.xlsx")
    {
      sheet_name_list.forEach(function (sheetName) {
        var worksheet = workbook.Sheets[sheetName];
        for (var cellName in worksheet) {
          //all keys that do not begin with "!" correspond to cell addresses

          if (cellName[0] === '!') {
            continue;
          }
          if(worksheet[cellName].v !== "School Name")
          {
            var newschool = self.get('store').createRecord('secondarySchool',{
              name: worksheet[cellName].v,
            });
            newschool.save();
          }
        }

      });
    }

  else if(file.name ==="students.xlsx")
  {
    sheet_name_list.forEach(function (sheetName) {
      var indexA=0; var indexB=0; var indexC=0; var indexD=0; var indexE=0; var indexF=0;
      var Aarray = []; var Barray = []; var Carray = []; var Darray = []; var Earray = []; var Farray = [];
      var worksheet = workbook.Sheets[sheetName];
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
        if (cellName[0] === '!') {
          continue;
        }
        //skip all cells in the first row
        if(indexA <1){
          indexA++;
          continue;
        }
        if(indexB<1)
        {
          indexB++;
          continue;
        }
        if(indexC<1)
        {
          indexC++;
          continue;
        }
        if(indexD<1)
        {
          indexD++;
          continue;
        }
        if(indexE<1)
        {
          indexE++;
          continue;
        }
        if(indexF<1)
        {
          indexF++;
          continue;
        }
        //for the first colume where cell name start with A
        if(cellName[0] === "A")
        {
          Aarray[indexA] = worksheet[cellName].v;
          //increment indexA
          indexA++;
        }
        //for the second colume where cell name start with B
        if(cellName[0] === "B")
        {
          Barray[indexB] = worksheet[cellName].v;
          //increment indexB
          indexB++;
        }
        //for the 3 colume where cell name start with C
        if(cellName[0] === "C")
        {
          Carray[indexC] = worksheet[cellName].v;
          //increment indexC
          indexC++;
        }
        //for the 4 colume where cell name start with D
        if(cellName[0] === "D")
        {
          Darray[indexD] = worksheet[cellName].v;
          //increment indexD
          indexD++;
        }
        //for the first colume where cell name start with A
        if(cellName[0] === "E")
        {
          Earray[indexE] = worksheet[cellName].v;
          //increment indexE
          indexE++;
        }
        //for the first colume where cell name start with A
        if(cellName[0] === "F")
        {
          Farray[indexF] = worksheet[cellName].v;
          //increment indexF
          indexF++;
        }
      }

      for(var i=1;i<indexA;i++)
      {
        var res = self.get('store').peekRecord('residency', Farray[i]); //get the students residency object
        var gen = self.get('store').peekRecord('gender', Darray[i]); //get the students gender object

        var newStudent = self.get('store').createRecord('student', { //create a new student record
          number: Aarray[i],
          firstName: Aarray[i],
          lastName: Aarray[i],
          DOB: new Date(Earray[i]),
          photo: self.get('photoPath'),
          resInfo: res,
          genderInfo: gen,
        });
        newStudent.save(); //commit the student record to db
      }
     });
  }

  else if(file.name === "AdvancedStanding.xlsx")
  {
    sheet_name_list.forEach(function (sheetName) {
      var indexA=0; var indexB=0; var indexC=0; var indexD=0; var indexE=0; var indexF=0;
      var Aarray = []; var Barray = []; var Carray = []; var Darray = []; var Earray = []; var Farray = []; var isLastA= false;
      var worksheet = workbook.Sheets[sheetName];
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
        if (cellName[0] === '!') {
          continue;
        }
        //skip all cells in the first row
        if(indexA <1){
          indexA++;
          continue;
        }
        if(indexB<1)
        {
          indexB++;
          continue;
        }
        if(indexC<1)
        {
          indexC++;
          continue;
        }
        if(indexD<1)
        {
          indexD++;
          continue;
        }
        if(indexE<1)
        {
          indexE++;
          continue;
        }
        if(indexF<1)
        {
          indexF++;
          continue;
        }
        //for the first colume where cell name start with A
        if(cellName[0] === "A")
        {
          Aarray[indexA] = worksheet[cellName].v;
          //increment indexA
          indexA++;
          isLastA = true;
        }
        //for the second colume where cell name start with B
        if(cellName[0] === "B")
        {
          if(worksheet[cellName].v === "NONE FOUND")
          {
            //if the couse is none found, need to clear the previous a array(student number)
            indexA--;
          }
          else{
            if(isLastA){
              Barray[indexB] = worksheet[cellName].v;
            }
            else {
              //if a is empty for this row, we have to add it to a so that it can have a second record
              //what this does is add an duplication of the previous student number to these row
              Aarray[indexA] = Aarray[indexA-1];
              indexA++;
            }
            //increment indexB
            indexB++;
            isLastA = false;
          }

        }
        //for the 3 colume where cell name start with C
        if(cellName[0] === "C")
        {
          Carray[indexC] = worksheet[cellName].v;
          //increment indexC
          indexC++;
        }
        //for the 4 colume where cell name start with D
        if(cellName[0] === "D")
        {
          Darray[indexD] = worksheet[cellName].v;
          //increment indexD
          indexD++;
        }
        //for the first colume where cell name start with A
        if(cellName[0] === "E")
        {
          Earray[indexE] = worksheet[cellName].v;
          //increment indexE
          indexE++;
        }
        //for the first colume where cell name start with A
        if(cellName[0] === "F")
        {
          Farray[indexF] = worksheet[cellName].v;
          //increment indexF
          indexF++;
        }
      }
      // for(var i=1;i<indexA;i++)
      // {
      //   var newASRecord = this.get('store').createRecord('advanced-standing', {
      //     course: this.get('courseNameAS'),
      //     description: this.get('descriptionAS'),
      //     units: this.get('unitsAS'),
      //     grade: this.get('gradeAS'),
      //     from: this.get('fromAS'),
      //     studentInfo: //findstudent(aarray[i]),
      //   });
      //   newASRecord.save();
      // }
      var testttt = self.get('studentModel').findBy("number",Aarray[1]);
      console.log(Aarray[1])
      console.log(testttt.get('number'));
     });
  }



},

// findstudent:function(studentnum){
//   console.log(studentnum);
//   console.log(this.get('studentModel').length);
//   this.get('studentModel').get('length');
//   //for (var i=0;i<)
// },


}
});
