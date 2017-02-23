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

  currentStudent:null,
  currentHighSchool:null,
  currentHighSchoolSubject:null,

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

    this.get('store').query('student', {
      limit: 10000,
      offset: 0
    }).then(function(records){
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
              if(worksheet[cellName].v === "NONE FOUND")
              {
                //if none comment popout a and continue
                indexA--;
                continue;
              }
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
            console.log(Barray[i]);
            self.send('findStudent',Aarray[i]);
            var studenttemp = self.get('currentStudent');
            studenttemp.set('admissionComments',Barray[i]);
            //how to walk around here except ajax
            studenttemp.save().then(() => {
              //     this.set('isStudentFormEditing', false);
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
          firstName: Barray[i],
          lastName: Carray[i],
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
      var worksheet = workbook.Sheets[sheetName];

      // //get the range of the worksheet
        var range = XLSX.utils.decode_range(worksheet["!ref"]);
      // //loop from start of the range to the end of the range
      var lastStudentNum;
       for(var R = (range.s.r+1); R <= range.e.r; R++)
       {
         var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
         var course =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
         //do nothing but skip the current row if the course is nothing
         if(course === "NONE FOUND")
         {
           continue;
         }

         else if(studentnum == null)
         {
           studentnum =  lastStudentNum;
         }
         else{
           //when student number is not null, record the student number
           lastStudentNum = studentnum;
         }
         //at this point, the student number is properly assigned even for student with multiple record
         //and all students with none record is excluded
         studentnum = studentnum.v;
         var description = worksheet[XLSX.utils.encode_cell({c: 2, r:R})].v;
         var units = worksheet[XLSX.utils.encode_cell({c: 3, r:R})].v;
         var grade = worksheet[XLSX.utils.encode_cell({c: 4, r:R})].v;
         var from = worksheet[XLSX.utils.encode_cell({c: 5, r:R})].v;
         //var studentdata = self.get('studentModel').findBy("number", studentnum);
         self.send('findStudent',studentnum);
         //console.log(self.get('currentStudent').get('number'));
         var newASRecord = self.get('store').createRecord('advanced-standing', {
           course: course,
           description: description,
           units: units,
           grade: grade,
           from: from,
           studentInfo: self.get('currentStudent'),
         });
         newASRecord.save();
       }
     });
  }
  else if(file.name ==="scholarshipsAndAwards.xlsx")
  {
    sheet_name_list.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];

      // //get the range of the worksheet
        var range = XLSX.utils.decode_range(worksheet["!ref"]);
      // //loop from start of the range to the end of the range
      var lastStudentNum;
       for(var R = (range.s.r+1); R <= range.e.r; R++)
       {
         var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
         var note =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
         //do nothing but skip the current row if the course is nothing
         if(note === "NONE FOUND")
         {
           continue;
         }

         if(studentnum == null)
         {
           studentnum =  lastStudentNum;
         }
         else{
           //when student number is not null, record the student number
           lastStudentNum = studentnum;
         }
         //at this point, the student number is properly assigned even for student with multiple record
         //and all students with none record is excluded
         studentnum = studentnum.v;
         self.send('findStudent',studentnum);
         var newAwardRecord = self.get('store').createRecord('scholarship-award', {
           note: note,
           studentInfo: self.get('currentStudent'),
         });
         newAwardRecord.save();
       }
     });
  }

  else if(file.name === "UndergraduateCourses.xlsx")
  {
    sheet_name_list.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];

      // //get the range of the worksheet
        var range = XLSX.utils.decode_range(worksheet["!ref"]);
      // //loop from start of the range to the end of the range
       for(var R = (range.s.r+1); R <= range.e.r; R++)
       {
         var courseLetter =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})].v;
         var courseNumber =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
         var name = worksheet[XLSX.utils.encode_cell({c: 2, r:R})].v;
         var unit = worksheet[XLSX.utils.encode_cell({c: 2, r:R})].v;
         var newCourseCodeRecord = self.get('store').createRecord('course-code', {
           courseLetter: courseLetter,
           courseNumber: courseNumber,
           name: name,
           unit: unit,
         });
         newCourseCodeRecord.save();
       }
     });
  }
  else if(file.name ==="BasisOfAdmission.xlsx")
  {
    sheet_name_list.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];

      // //get the range of the worksheet
        var range = XLSX.utils.decode_range(worksheet["!ref"]);
      // //loop from start of the range to the end of the range
      var lastStudentNum;
       for(var R = (range.s.r+1); R <= range.e.r; R++)
       {
         var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
         var note =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
         //do nothing but skip the current row if the course is nothing
         if(note === "NONE FOUND")
         {
           continue;
         }

         if(studentnum == null)
         {
           studentnum =  lastStudentNum;
         }
         else{
           //when student number is not null, record the student number
           lastStudentNum = studentnum;
         }
         //at this point, the student number is properly assigned even for student with multiple record
         //and all students with none record is excluded
         studentnum = studentnum.v;
         self.send('findStudent',studentnum);
         var studenttemp = self.get('currentStudent');
        var updatednote;
        //if the basisOfAdmission is null replace it with note
         if(studenttemp.get('basisOfAdmission') == null)
         {
            updatednote = note;
         }
         //else append the not into that
         else{
             updatednote = studenttemp.get('basisOfAdmission')+"/n"+note;
         }

         studenttemp.set('basisOfAdmission',updatednote);
         //how to walk around here except ajax
         studenttemp.save().then(() => {
           //     this.set('isStudentFormEditing', false);
         });
       }
     });
  }

  else if(file.name ==="RegistrationComments.xlsx")
  {
    sheet_name_list.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];

      // //get the range of the worksheet
        var range = XLSX.utils.decode_range(worksheet["!ref"]);
      // //loop from start of the range to the end of the range
      var lastStudentNum;
       for(var R = (range.s.r+1); R <= range.e.r; R++)
       {
         var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
         var note =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
         //do nothing but skip the current row if the course is nothing
         if(note === "NONE FOUND")
         {
           continue;
         }

         if(studentnum == null)
         {
           studentnum =  lastStudentNum;
         }
         else{
           //when student number is not null, record the student number
           lastStudentNum = studentnum;
         }
         //at this point, the student number is properly assigned even for student with multiple record
         //and all students with none record is excluded
         studentnum = studentnum.v;
         self.send('findStudent',studentnum);
         var studenttemp = self.get('currentStudent');
        var updatednote;
        //if the basisOfAdmission is null replace it with note
         if(studenttemp.get('registrationComments') == null)
         {
            updatednote = note;
         }
         //else append the not into that
         else{
             updatednote = studenttemp.get('registrationComments')+"\n"+note;
         }

         studenttemp.set('registrationComments',updatednote);
         //how to walk around here except ajax
         studenttemp.save().then(() => {
           //     this.set('isStudentFormEditing', false);
         });
       }
     });
  }

  else if(file.name ==="HighSchoolCourseInformation.xlsx")
  {
    sheet_name_list.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];

      // //get the range of the worksheet
      var range = XLSX.utils.decode_range(worksheet["!ref"]);
      // //loop from start of the range to the end of the range
      var lastStudentNum,lastSchoolName;
       for(var R = (range.s.r+1); R <= range.e.r; R++)
       {
         var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
         var schoolname =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})];
         //do nothing but skip the current row if the course is nothing

         if(studentnum == null)
         {
           studentnum =  lastStudentNum;
         }
         else{
           //when student number is not null, record the student number
           lastStudentNum = studentnum;
         }
         if(schoolname == null)
         {
           schoolname =  lastSchoolName;
         }
         else{
           //when school name is not null, record the school name
           lastSchoolName = schoolname;
         }

         //at this point, the student number is properly assigned even for student with multiple record
         //and all students with none record is excluded
         studentnum = studentnum.v;
         schoolname = schoolname.v;
         if(schoolname ==="NONE FOUND")
         {
           //if the schoolname is not found, skip this row
           continue;
         }

         self.send('findStudent',studentnum);
         var studenttemp = self.get('currentStudent');
         var level = worksheet[XLSX.utils.encode_cell({c: 2, r:R})];
         var subject = worksheet[XLSX.utils.encode_cell({c: 3, r:R})];
         var description = worksheet[XLSX.utils.encode_cell({c: 4, r:R})];
         var source = worksheet[XLSX.utils.encode_cell({c: 5, r:R})];
         var units = worksheet[XLSX.utils.encode_cell({c: 6, r:R})];
         var grade = worksheet[XLSX.utils.encode_cell({c: 7, r:R})];

         //create high school subject
         var newhssubject = self.get('store').createRecord('high-school-subject',{
           name: subject,
           description: description,
         });
         newhssubject.save();

         //create high school course
         var
         var newhscoures = self.get('store').createRecord('high-school-course',{
           level:level,
           source:source,
           unit:units,
           SecondSchoolInfo:DS.belongsTo('secondary-school'),
           HighSchoolSubjectInfo:DS.belongsTo('high-school-subject'),
         });

         //create hs course grade record
         var newhsCourseGrade = self.get('store').createRecord('hscourse-grade', {
           mark:grade,
           studentInfo:  studenttemp,
           HighSchoolCoursesInfo: DS.belongsTo('high-school-courses'),
         });
         newCourseCodeRecord.save();

       }
     });
  }



},

findStudent:function(studentnum){
  var self = this;
  var length = self.get('studentModel').get('length');
  for (var i=0;i<length;i++)
  {
    let tempstudent = self.get('studentModel').objectAt(i);
    let tempnum = tempstudent.get('number');
    //console.log(tempnum)
    if(tempnum == studentnum)
    {
      self.set('currentStudent',tempstudent);
    }
  }
},

findsubject:function(subject,description){
  var self = this;
  var length = self.get('highSchoolSubjectModel').get('length');
  for (var i=0;i<length;i++)
  {
    let tempsubject = self.get('highSchoolSubjectModel').objectAt(i);
    let tempname = tempsubject.get('name');
    let tempdescription = tempsubject.get('description');
    if((tempname == subject) && (tempdescription == description))
    {
      self.set('currentHighSchoolSubject',tempsubject);
    }
  }
},

findhighschool:function(highschool){
  var self = this;
  var length = self.get('secondarySchoolModel').get('length');
  for (var i=0;i<length;i++)
  {
    let temphighschool = self.get('secondarySchoolModel').objectAt(i);
    let tempname = temphighschool.get('name');
    //console.log(tempnum)
    if(tempname == highschool)
    {
      self.set('currentHighSchool',temphighschool);
    }
  }
}



}
});
