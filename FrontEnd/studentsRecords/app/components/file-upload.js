import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  /* global XLSX */

  filetobeloaded: "Please Click Delete first",
  count:0,
  showLoader:false,
  showUpload:true,

  actions:{
    fileLoaded: function(file) {
      //each time the loader is called, show loading and hide loader
      this.set('showLoader',true);
      this.set('showUpload',false);
      //each time the fileLoaded function is called, update the counter and lable name
      //and according to the given sequence determine if the file should be accepted
      var counter = this.get('count');
      var label = this.get('filetobeloaded');

      var self = this;
      var workbook = XLSX.read(file.data, {type: 'binary'});
      var sheet_name_list = workbook.SheetNames;

      if(counter === 0)
      {
        //counter =0 means the delete is not called, return anyway
        return;
      }

      if(counter===1)
      {
        if(file.name!== "residencies.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===2)
      {
        if(file.name!== "genders.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===3)
      {
        if(file.name!== "students.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===4)
      {
        if(file.name!== "AdvancedStanding.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===5)
      {
        if(file.name!== "AdmissionAverages.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===6)
      {
        if(file.name!== "AdmissionComments.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===7)
      {
        if(file.name!== "BasisOfAdmission.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===8)
      {
        if(file.name!== "RegistrationComments.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===9)
      {
        if(file.name!== "scholarshipsAndAwards.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===10)
      {
        if(file.name!== "HighSchools.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===11)
      {
        if(file.name!== "HighSchoolCourseInformation.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===12)
      {
        if(file.name!== "termcodes.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===14)
      {
        if(file.name!== "UndergraduateCourses.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===13)
      {
        if(file.name!== "UndergraduateRecordCourses.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===15)
      {
        if(file.name!== "UndergraduateRecordPlans.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===16)
      {
        if(file.name!== "AssessmentCodes.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===17)
      {
        if(file.name!== "Departments.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===18)
      {
        if(file.name!== "ProgramAdministrations.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter ===19)
      {
        if(file.name!== "UndergraduateRecordAdjudications.xlsx")
        {
          //if file name is not residency don't accept
          return;
        }
      }

      if(counter>19)
      {
        //counter goes beyond 14, it shouldn't upload any files
        return;
      }

      if(file.name === "genders.xlsx")
      {
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 1000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload students.xlsx";
        self.set('filetobeloaded',label);

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
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 1000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload genders.xlsx";
        self.set('filetobeloaded',label);

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
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 1000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload UndergraduateRecordCourses.xlsx";
        self.set('filetobeloaded',label);

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
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 1000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload BasisOfAdmission.xlsx";
        self.set('filetobeloaded',label);

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

          //get all student from the local store cache
          var allStudentRecord =self.get('store').peekAll('student');
          //student record used for the targeted student
          var studentRecord;
          //double for loop, compare each element in Aarray (student number array) to each object in all student record
          for(let i=1;i<indexA;i++)
          {
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(Aarray[i] == allStudentRecord.objectAt(j).get('number'))
              {
                studentRecord = allStudentRecord.objectAt(j);
                studentRecord.set('admissionComments',Barray[i]);
                //how to walk around here except ajax
                studentRecord.save();
              }
            }
          }
        });
      }

      else if(file.name === "HighSchools.xlsx")
      {
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 2000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload HighSchoolCourseInformation.xlsx";
        self.set('filetobeloaded',label);

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
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 3000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload AdvancedStanding.xlsx";
        self.set('filetobeloaded',label);

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

          for(let i=1;i<indexA;i++)
          {
            var res;
            var gen;
            //find the residency according to its name in the local cache
            var allres = self.get('store').peekAll('residency');
            for(let j=0;j<allres.get('length');j++)
            {
              if(Farray[i]==allres.objectAt(j).get('name'))
              {
                res = allres.objectAt(j);
              }
            }

            //find the gender according to its name in the local cache
            var allgen = self.get('store').peekAll('gender');
            for(let j=0;j<allgen.get('length');j++)
            {
              if(Darray[i]==allgen.objectAt(j).get('name'))
              {
                gen = allgen.objectAt(j);
              }
            }

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
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload AdmissionAverages.xlsx";
        self.set('filetobeloaded',label);

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

            if(studentnum == null)
            {
              studentnum = lastStudentNum;
            }
            else if(studentnum.v =="")
            {
              studentnum = lastStudentNum;
            }
            else {
              lastStudentNum = studentnum;
            }
            //at this point, the student number is properly assigned even for student with multiple record
            //and all students with none record is excluded
            studentnum = studentnum.v;
            var description = worksheet[XLSX.utils.encode_cell({c: 2, r:R})].v;
            var units = worksheet[XLSX.utils.encode_cell({c: 3, r:R})].v;
            var grade = worksheet[XLSX.utils.encode_cell({c: 4, r:R})].v;
            var from = worksheet[XLSX.utils.encode_cell({c: 5, r:R})].v;
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                //student record used for the targeted student
                var studentRecord = allStudentRecord.objectAt(j);
                //if the student matches, save the advanced standing
                var newASRecord = self.get('store').createRecord('advanced-standing', {
                  course: course,
                  description: description,
                  units: units,
                  grade: grade,
                  from: from,
                  studentInfo: studentRecord,
                });
                if(j==allStudentRecord.get('length')-1)
                {
                  newASRecord.save().then(function(){
                    self.set('showLoader',false);
                    self.set('showUpload',true);
                  });
                }
                else{
                  newASRecord.save();
                }
              }
            }
          }
        });
      }
      else if(file.name ==="scholarshipsAndAwards.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload HighSchools.xlsx";
        self.set('filetobeloaded',label);

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
              studentnum = lastStudentNum;
            }
            else if(studentnum.v =="")
            {
              studentnum = lastStudentNum;
            }
            else {
              lastStudentNum = studentnum;
            }
            //at this point, the student number is properly assigned even for student with multiple record
            //and all students with none record is excluded
            studentnum = studentnum.v;
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                //student record used for the targeted student
                var studentRecord = allStudentRecord.objectAt(j);
                var newAwardRecord = self.get('store').createRecord('scholarship-award', {
                  note: note,
                  studentInfo: studentRecord,
                });

                if(j==allStudentRecord.get('length')-1)
                {
                  newAwardRecord.save().then(function(){
                    self.set('showLoader',false);
                    self.set('showUpload',true);
                  });
                }
                else{
                  newAwardRecord.save();
                }
              }
            }
          }
        });
      }

      else if(file.name === "UndergraduateCourses.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload UndergraduateRecordPlans.xlsx";
        self.set('filetobeloaded',label);

        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          var index =0; var courseLetterArray=[]; var courseNumberArray=[];
          var nameArray=[]; var unitArray = [];
          for(var R = (range.s.r+1); R <= range.e.r; R++)
          {
            var courseLetter =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})].v;
            var courseNumber =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
            var name = worksheet[XLSX.utils.encode_cell({c: 2, r:R})].v;
            var unit = worksheet[XLSX.utils.encode_cell({c: 3, r:R})].v;
            courseLetterArray[index] = courseLetter;
            courseNumberArray[index] = courseNumber;
            nameArray[index] = name;
            unitArray[index] = unit;
            index++;
          }
          //start updating the courses
          var allCourseCode = self.get('store').peekAll('course-code');

          for(let i=0;i<courseLetterArray.length;i++)
          {
            for(let j=0;j<allCourseCode.get('length');j++)
            {
              if(courseLetterArray[i]==allCourseCode.objectAt(j).get('courseLetter') && courseNumberArray[i]==allCourseCode.objectAt(j).get('courseNumber'))
              {
                //if same course number and letter, need to update the other info
                let curretCourseCode = allCourseCode.objectAt(j);
                curretCourseCode.set('name',nameArray[i]);
                curretCourseCode.set('unit',unitArray[i]);

                if(j==allCourseCode.get('length')-1)
                {
                  curretCourseCode.save().then(function(){
                    self.set('showLoader',false);
                    self.set('showUpload',true);
                  });
                }
                else{
                  curretCourseCode.save();
                }
              }
            }
          }
        });
      }
      else if(file.name ==="BasisOfAdmission.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload RegistrationComments.xlsx";
        self.set('filetobeloaded',label);

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
              studentnum = lastStudentNum;
            }
            else if(studentnum.v =="")
            {
              studentnum = lastStudentNum;
            }
            else {
              lastStudentNum = studentnum;
            }
            //at this point, the student number is properly assigned even for student with multiple record
            //and all students with none record is excluded
            studentnum = studentnum.v;
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                //student record used for the targeted student
                var studentRecord = allStudentRecord.objectAt(j);
                var updatednote;
                //if the basisOfAdmission is null replace it with note
                if(studentRecord.get('basisOfAdmission') == null)
                {
                  updatednote = note;
                }
                //else append the not into that
                else{
                  updatednote = studentRecord.get('basisOfAdmission')+"\n"+note;
                }

                studentRecord.set('basisOfAdmission',updatednote);
                //how to walk around here except ajax
                if(j==allStudentRecord.get('length')-1)
                {
                  studentRecord.save().then(function(){
                    self.set('showLoader',false);
                    self.set('showUpload',true);
                  });
                }
                else{
                  studentRecord.save();
                }

              }
            }
          }
        });
      }

      else if(file.name ==="RegistrationComments.xlsx")
      {
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 2000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload scholarshipsAndAwards.xlsx";
        self.set('filetobeloaded',label);

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
              studentnum = lastStudentNum;
            }
            else if(studentnum.v =="")
            {
              studentnum = lastStudentNum;
            }
            else {
              lastStudentNum = studentnum;
            }
            //at this point, the student number is properly assigned even for student with multiple record
            //and all students with none record is excluded
            studentnum = studentnum.v;
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                //student record used for the targeted student
                var studentRecord = allStudentRecord.objectAt(j);
                var updatednote;
                //if the basisOfAdmission is null replace it with note
                if(studentRecord.get('registrationComments') == null)
                {
                  updatednote = note;
                }
                //else append the not into that
                else{
                  updatednote = studentRecord.get('registrationComments')+"\n"+note;
                }

                studentRecord.set('registrationComments',updatednote);
                //how to walk around here except ajax
                studentRecord.save();
              }
            }
          }
        });
      }
      else if(file.name ==="HighSchoolCourseInformation.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload termcodes.xlsx";
        self.set('filetobeloaded',label);

        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];
          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          var lastStudentNum,lastSchoolName;
          //a bunch of array to hold the value
          var studentnumArray = []; var schoolnameArray = []; var levelArray = []; var subjectArray = [];
          var descriptionArray = []; var sourceArray = []; var unitsArray = []; var gradeArray = [];
          var subjectArrayTracker = []; var descriptionArraytracker =[];
          var index =0;
          for(var R = (range.s.r+1); R <= range.e.r; R++)
          {
            var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
            var schoolname =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})];

            if(studentnum == null)
            {
              studentnum = lastStudentNum;
            }
            else if(studentnum.v =="")
            {
              studentnum = lastStudentNum;
            }
            else {
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
            var level = worksheet[XLSX.utils.encode_cell({c: 2, r:R})].v;
            var subject = worksheet[XLSX.utils.encode_cell({c: 3, r:R})].v;
            var description = worksheet[XLSX.utils.encode_cell({c: 4, r:R})].v;
            var source = worksheet[XLSX.utils.encode_cell({c: 5, r:R})].v;
            var units = worksheet[XLSX.utils.encode_cell({c: 6, r:R})].v;
            var grade = worksheet[XLSX.utils.encode_cell({c: 7, r:R})].v;
            //store all values in the array
            studentnumArray[index] = studentnum;
            schoolnameArray[index] = schoolname;
            levelArray[index] = level;
            sourceArray[index] = source;
            unitsArray[index] = units;
            gradeArray[index] = grade;
            //two tracker used to know the corresponding subject and description of the student
            subjectArrayTracker[index] =subject;
            descriptionArraytracker[index] = description;
            //if the line is not skiped
            index++;

            //check the subject array to eliminate any duplications it might have, used to create subject model
            //if the subjectArray length is zero addd it anyway
            //boolean check if the subject found in the array
            let found = false;
            for(let i=0;i<subjectArray.length;i++)
            {
              //if subject name and description exsit in the array, don't add them again
              if((subjectArray[i]==subject) && (descriptionArray[i] == description))
              {
                found = true;
              }
            }
            if(!found)
            {
              //if it does not exist before add it to the array
              subjectArray[subjectArray.length] = subject;
              descriptionArray[descriptionArray.length] = description;
            }
          }
          //after the loop all values should be stored in the array

          //create all high school subjects
          for(let i=0;i<subjectArray.length;i++)
          {
            let newhssubject = self.get('store').createRecord('high-school-subject',{
              name: subjectArray[i],
              description: descriptionArray[i],
            });

            if(i==subjectArray.length-1)
            {
              //this is the last run of the sae new subject, using the call back can guarentee that the
              //post of new subjects is done before starting to add the new courses
              newhssubject.save().then(function(){
                //create high school course

                for(let j=0;j<levelArray.length;j++)
                {
                  //get all local cached high school subject
                  var allsubject = self.get('store').peekAll('high-school-subject');
                  var currentsubject;
                  for(let i=0;i<allsubject.get('length');i++)
                  {
                    //if the subject name and description both matches
                    if(subjectArrayTracker[j] == allsubject.objectAt(i).get('name') && descriptionArraytracker[j] == allsubject.objectAt(i).get('description'))
                    {
                      currentsubject = allsubject.objectAt(i);
                    }
                  }
                  //get all local cached secondary-school and find the highschool by name
                  var allHighschoolRecord= self.get('store').peekAll('secondary-school');
                  var highschoolRecord;
                  for(let i=0;i<allHighschoolRecord.get('length');i++)
                  {
                    if(allHighschoolRecord.objectAt(i).get('name') == schoolnameArray[j])
                    {
                      highschoolRecord = allHighschoolRecord.objectAt(i);
                      var newhscoures = self.get('store').createRecord('high-school-course',{
                        level:levelArray[j],
                        source:sourceArray[j],
                        unit:unitsArray[j],
                        school:highschoolRecord,
                        course:currentsubject,
                      });
                      if(j== levelArray.length-1)
                      {
                        //this is the last run of the new course, using callback can guarentee the new courses
                        // are posted before the new course grade creation, so that new course pk will not be null
                        newhscoures.save().then(function(){
                          //create hs course grade record
                          for(var k=0;k<unitsArray.length;k++)
                          {
                            //get all student from the local store cache
                            var allStudentRecord =self.get('store').peekAll('student');
                            var studentRecord;
                            for(let m=0;m<allStudentRecord.get('length');m++)
                            {
                              //if the stduent number matches
                              if(studentnumArray[k] == allStudentRecord.objectAt(m).get('number'))
                              {
                                //student record used for the targeted student
                                studentRecord = allStudentRecord.objectAt(m);
                              }
                            }
                            //get all high school courses from local cache
                            var allHighSchoolCourses = self.get('store').peekAll('high-school-course');
                            for(let l=0;l<allHighSchoolCourses.get('length');l++)
                            {
                              //if the high-school-course matches the course name and grade and description
                              if(levelArray[k]==allHighSchoolCourses.objectAt(l).get('level')
                              && sourceArray[k]==allHighSchoolCourses.objectAt(l).get('source')
                              && unitsArray[k]==allHighSchoolCourses.objectAt(l).get('unit')
                              && schoolnameArray[k]==allHighSchoolCourses.objectAt(l).get('school').get('name')
                              && subjectArrayTracker[k]==allHighSchoolCourses.objectAt(l).get('course').get('name')
                              && descriptionArraytracker[k]==allHighSchoolCourses.objectAt(l).get('course').get('description'))
                              {
                                var hscourse = allHighSchoolCourses.objectAt(l);
                                var newhsCourseGrade = self.get('store').createRecord('hscourse-grade', {
                                  mark:gradeArray[k],
                                  source: hscourse,
                                  studentInfo: studentRecord,
                                });

                                if(l==allHighSchoolCourses.get('length')-1)
                                {
                                  newhsCourseGrade.save().then(function(){
                                    self.set('showLoader',false);
                                    self.set('showUpload',true);
                                  });
                                }
                                else{
                                  newhsCourseGrade.save();
                                }
                              }
                            }
                          }
                        });
                      }
                      else
                      {
                        //when it's not the last run of the save course
                        newhscoures.save();
                      }

                    }
                  }
                }
              });
            }
            else{
              //when it's not the last run of the save subject
              newhssubject.save();
            }
          }
        });
      }
      else if(file.name === "AdmissionAverages.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload AdmissionComments.xlsx";
        self.set('filetobeloaded',label);

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
            if(studentnum == null)
            {
              studentnum = lastStudentNum;
            }
            else if(studentnum.v =="")
            {
              studentnum = lastStudentNum;
            }
            else {
              lastStudentNum = studentnum;
            }
            studentnum = studentnum.v;
            //get all local cached student and find the student by student number
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                //student record used for the targeted student
                var studentRecord = allStudentRecord.objectAt(j);
                var updatednote;
                //if the basisOfAdmission is null replace it with note
                if(studentRecord.get('admissionAverage') == null)
                {
                  updatednote = note;
                }
                //else append the not into that
                else{
                  updatednote = studentRecord.get('admissionAverage')+"\n"+note;
                }

                studentRecord.set('admissionAverage',updatednote);
                //how to walk around here except ajax

                if(j==allStudentRecord.get('length')-1)
                {
                  studentRecord.save().then(function(){
                    self.set('showLoader',false);
                    self.set('showUpload',true);
                  });
                }
                else{
                  studentRecord.save();
                }
              }
            }
          }
        });
      }

      else if(file.name ==="UndergraduateRecordPlans.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload the AssessmentCodes.xlsx";
        self.set('filetobeloaded',label);

        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          var lastterm,lastprogram,lastlevel,lastload,lastStudentNum;
          var termCodeArray =[]; var programArray =[]; var levelArray = [];
          var studentnumArray = []; var loadArray =[]; var planArray =[];
          var index=0;
          var planModelArray=[]; var programModelArray =[]; var loadModelArray = [];
          var levelModelArray =[];
          for(var R = (range.s.r+1); R < range.e.r; R++)
          {
            //student number not useful in this case
            var term =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})];
            var program = worksheet[XLSX.utils.encode_cell({c: 2, r:R})];
            var level = worksheet[XLSX.utils.encode_cell({c: 3, r:R})];
            var load = worksheet[XLSX.utils.encode_cell({c: 4, r:R})];
            var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
            var plan = worksheet[XLSX.utils.encode_cell({c: 5, r:R})];
            //if term is null, that means there is a same plan for program record
            //use all previous record for it.
            if(plan == null)
            {
              //when plan is null, that means this roll is entirely empty, skip current row
              continue;
            }
            if(studentnum == null)
            {
              studentnum = lastStudentNum;
            }
            else if(studentnum.v =="")
            {
              studentnum = lastStudentNum;
            }
            else {
              lastStudentNum = studentnum;
            }
            if(term == null)
            {
              term = lastterm;
              program = lastprogram;
              level = lastlevel;
              load = lastload;
            }
            else{
              lastterm = term;
              lastprogram = program;
              lastlevel = level;
              lastload = load;
            }

            //set all varible to their corresponding values
            term = term.v;
            program = program.v;
            level = level.v;
            load = load.v;
            studentnum = studentnum.v;
            plan = plan.v;
            //assign the value to corresponding array
            termCodeArray[index] = term;
            programArray[index] = program;
            levelArray[index] = level;
            loadArray[index] = load;
            studentnumArray[index] = studentnum;
            planArray[index] = plan;

            index++;

            //check duplications for plan and add non duplicated to plan model array
            //boolean check if the plan found in the array
            let foundplan = false;
            for(let i=0;i<planModelArray.length;i++)
            {
              //if plan is found in the array
              if(planModelArray[i]==plan)
              {
                foundplan = true;
              }
            }
            if(!foundplan)
            {
              //if it does not exist before add it to the array
              planModelArray[planModelArray.length] = plan;
            }

            //check duplications for plan and add non duplicated to plan model array
            //boolean check if the plan found in the array
            let foundprogram = false;
            for(let i=0;i<programModelArray.length;i++)
            {
              //if program is found in the array
              if(programModelArray[i]==program && levelModelArray[i]==level && loadModelArray == load)
              {
                foundprogram = true;
              }
            }
            if(!foundprogram)
            {
              //if it does not exist before add it to the array
              programModelArray[programModelArray.length] = program;
              levelModelArray[levelModelArray.length] = level;
              loadModelArray[loadModelArray.length] = load;
            }
          }

          //create plan model
          for(let i=0;i<planModelArray.length;i++)
          {
            var newplan = self.get('store').createRecord('plan-code',{
              name: planModelArray[i],
            });
            if(i==planModelArray.length-1)
            {
              newplan.save().then(function(){

                //start creating the program record
                for (let j=0;j<programModelArray.length;j++)
                {
                  var newProgram = self.get('store').createRecord('program-record',{
                    name: programModelArray[j],
                    level: levelModelArray[j],
                    load: loadModelArray[j],
                  });
                  if(j== programModelArray.length-1)
                  {
                    newProgram.save().then(function(){

                      //start updateing the program record plan code
                      //get all program model in local cache
                      var allProgram = self.get('store').peekAll('program-record');
                      for(let k=0;k<allProgram.get('length');k++)
                      {
                        //first get the plan code
                        var allPlanCode = self.get('store').peekAll('plan-code');
                        var currentPlanCode;
                        for(let l=0;l<allPlanCode.get('length');l++)
                        {
                          if(planArray[k] == allPlanCode.objectAt(l).get('name'))
                          {
                            currentPlanCode = allPlanCode.objectAt(l);
                          }
                        }
                        //after loate the plan code
                        var currentProgram;
                        for(let l=0;l<allProgram.get('length');l++)
                        {
                          if(allProgram.objectAt(l).get('name') == programArray[k]
                          && allProgram.objectAt(l).get('level') == levelArray[k]
                          && allProgram.objectAt(l).get('load') == loadArray[k])
                          {
                            //located the program record
                            currentProgram = allProgram.objectAt(l);

                          }
                        }
                        //after locate the program record
                        //if the plan code array is null
                        if(currentProgram.get('plan') === null)
                        {
                          let plancodearray = [currentPlanCode];
                          currentProgram.set('plan',plancodearray);
                        }
                        //if the plan code array is not empty
                        else
                        {
                          let plancodearray = currentProgram.get('plan');
                          //add the current plan code to the array
                          plancodearray.pushObject(currentPlanCode);
                        }

                        if(k==allProgram.get('length')-1)
                        {
                          currentProgram.save().then(function(){

                            //the last run of the current program, start adding program record in Terms
                            for (let x=0;x<termCodeArray.length;x++)
                            {
                              //first get all terms
                              var allterm = self.get('store').peekAll('term');
                              var currentterm;
                              for (let a =0;a<allterm.get('length');a++)
                              {
                                if(allterm.objectAt(a).get('term').get('name') == termCodeArray[x]
                                && allterm.objectAt(a).get('studentInfo').get('number') == studentnumArray[x])
                                {
                                  //if both term name and student number matches
                                  currentterm = allterm.objectAt(a);

                                }
                              }
                              //after located the term
                              var allProgram = self.get('store').peekAll('program-record');
                              var currentProgramobj;
                              for(let b=0;b<allProgram.get('length');b++)
                              {
                                if(allProgram.objectAt(b).get('name') == programArray[x]
                                && allProgram.objectAt(b).get('level') == levelArray[x]
                                && allProgram.objectAt(b).get('load') == loadArray[x])
                                {
                                  //located the program record
                                  currentProgramobj = allProgram.objectAt(b);

                                }
                              }
                              //after locate the program record
                              //start updating the term
                              //if the plan code array is null
                              if(currentterm.get('program') == null)
                              {
                                let programarray = [currentProgramobj];
                                currentterm.set('program',programarray);
                              }
                              //if the plan code array is not empty
                              else
                              {
                                let programarray = currentterm.get('program');
                                //add the current plan code to the array
                                programarray.pushObject(currentProgramobj);
                              }

                              if(x==allProgram.get('length')-1)
                              {
                                currentterm.save().then(function(){
                                  self.set('showLoader',false);
                                  self.set('showUpload',true);
                                });
                              }
                              else{
                                currentterm.save();
                              }
                            }
                          });
                        }
                        else{
                          currentProgram.save();
                        }
                      }
                    });
                  }
                  else{
                    newProgram.save();
                  }
                }
              });
            }
            else{
              newplan.save();
            }
          }
        });
      }

      else if(file.name === "UndergraduateRecordCourses.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload UndergraduateCourses.xlsx";
        self.set('filetobeloaded',label);

        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          var lastStudentNum; var lastterm;
          var studentnumArray = []; var termCodeArray = []; var courseLetterArray =[];
          var courseNumberArray =[]; var sectionArray =[]; var gradeArray =[];
          var noteArray =[]; var gradeModelArray=[]; var noteModelArray=[];
          var index =0;
          var termModelStudentArray = []; var termModelTermArray =[];
          for(var R = (range.s.r+1); R <= range.e.r; R++)
          {
            //student number not useful in this case
            let studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
            let term =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})];
            let courseLetter = worksheet[XLSX.utils.encode_cell({c: 2, r:R})];
            let courseNumber = worksheet[XLSX.utils.encode_cell({c: 3, r:R})];
            let section = worksheet[XLSX.utils.encode_cell({c: 4, r:R})];
            let grade = worksheet[XLSX.utils.encode_cell({c: 5, r:R})];
            let note = worksheet[XLSX.utils.encode_cell({c: 6, r:R})];

            //if note is null keep it like that else assignment the acutal value to note
            if(note != null)
            {
              note = note.v;
            }
            if(grade != null)
            {
              grade = grade.v;
            }
            if(studentnum == null)
            {
              studentnum = lastStudentNum;
            }
            else if(studentnum.v =="")
            {
              studentnum = lastStudentNum;
            }
            else {
              lastStudentNum = studentnum;
            }
            if(term == null)
            {
              term = lastterm;
            }
            else{
              lastterm = term;
              //if term is not null add the term and student info to term model array, used to construct term model (unique)
              let tempTerm = term.v;
              let tempStudent = studentnum.v;
              termModelTermArray[termModelTermArray.length] = tempTerm;
              termModelStudentArray[termModelStudentArray.length] = tempStudent;
            }
            term = term.v;
            studentnum = studentnum.v;
            courseLetter = courseLetter.v;
            courseNumber = courseNumber.v;
            section = section.v;
            //assign the value to their corresponding array
            studentnumArray[index] = studentnum;
            termCodeArray[index] = term;
            courseLetterArray[index] = courseLetter;
            courseNumberArray[index] = courseNumber;
            sectionArray[index] = section;
            gradeArray[index] = grade;
            noteArray[index] = note;
            index++;
            //check the grade array to eliminate any duplications it might have, used to create grade model
            //if the grademodel length is zero addd it anyway
            //boolean check if the subject found in the array
            let found = false;
            for(let i=0;i<gradeModelArray.length;i++)
            {
              //if subject name and description exsit in the array, don't add them again
              if((gradeModelArray[i] == grade) && (noteModelArray[i] == note))
              {
                found = true;
              }
            }
            if(!found)
            {
              //if it does not exist before add it to the array
              gradeModelArray[gradeModelArray.length] = grade;
              noteModelArray[noteModelArray.length] = note;
            }
          }
          //end of the for loop all data at this point should be stored in the array

          //create new grade
          for(let i=0;i<gradeModelArray.length;i++)
          {
            var newgrade = self.get('store').createRecord('grade',{
              mark: gradeModelArray[i],
              note: noteModelArray[i],
            });
            if(i == gradeModelArray.length-1)
            {
              //when it is the last run, save the data and use to call back function to chin the series of saving together
              newgrade.save().then(function(){

                //this call back can gurentee when all grade is posted to db before proceed
                //get all student from the local store cache
                var allStudentRecord =self.get('store').peekAll('student');
                //student record used for the targeted student
                var studentRecord;
                //double for loop, compare each element in Aarray (student number array) to each object in all student record
                for(let j=0;j<termModelTermArray.length;j++)
                {
                  for(let k=0;k<allStudentRecord.get('length');k++)
                  {
                    //if the stduent number matches
                    if(termModelStudentArray[j] == allStudentRecord.objectAt(k).get('number'))
                    {
                      studentRecord = allStudentRecord.objectAt(k);
                    }
                  }

                  //start constructing the term model
                  var allTermcode = self.get('store').peekAll('term-code');
                  var currentTermCode;
                  for (let a=0;a<allTermcode.get('length');a++)
                  {
                    if(allTermcode.objectAt(a).get('name') == termModelTermArray[j])
                    {
                      //if term code matches
                      currentTermCode = allTermcode.objectAt(a);
                      //after found the term code
                      var newterm= self.get('store').createRecord('term',{
                        term:currentTermCode,
                        studentInfo: studentRecord,
                      });
                      //use the callback on the last term save to chain the function together
                      if(j==termModelTermArray.length-1)
                      {
                        newterm.save().then(function(){

                          //start updating course code
                          var allGradeRecord = self.get('store').peekAll('grade');
                          var allterm = self.get('store').peekAll('term');
                          for(let k=0;k<courseLetterArray.length;k++)
                          {
                            var currentgrade;
                            for(let l=0;l<allGradeRecord.get('length');l++)
                            {
                              //if the grade mark and note matches
                              if(allGradeRecord.objectAt(l).get('mark') == gradeArray[k] && allGradeRecord.objectAt(l).get('note') == noteArray[k])
                              {
                                currentgrade = allGradeRecord.objectAt(l);

                              }
                            }
                            //at this point it should either get the grade object or the student has a null grade

                            var currenttermobj;
                            for (let m=0;m<allterm.get('length');m++)
                            {
                              if((termCodeArray[k]==allterm.objectAt(m).get('term').get('name')) && (studentnumArray[k]==allterm.objectAt(m).get('studentInfo').get('number')))
                              {
                                currenttermobj = allterm.objectAt(m);

                              }
                            }
                            //start updating the course code grade info
                            //get all course code from local cache

                            var currentcourse = self.get('store').createRecord('course-code',{
                              courseLetter: courseLetterArray[k],
                              courseNumber: courseNumberArray[k],
                              mark: currentgrade,
                              semester: currenttermobj
                            });

                            if(k==courseLetterArray.get('length')-1)
                            {
                              currentcourse.save().then(function(){
                                self.set('showLoader',false);
                                self.set('showUpload',true);
                              });
                            }
                            else{
                              currentcourse.save();
                            }
                          }
                        });
                      }
                      else{
                        newterm.save();
                      }
                    }
                  }
                }
              });
            }
            else{
              //when it isn't the last run, save it normally
              newgrade.save();
            }
          }
        });
      }
      else if(file.name === "AssessmentCodes.xlsx")
      {
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 2000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload Departments.xlsx";
        self.set('filetobeloaded',label);

        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          for(var R = (range.s.r+1); R <= range.e.r; R++)
          {
            var code1 =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})].v;
            var name1 =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;


            let newAssessmentCode = self.get('store').createRecord('assessment-code',{
              code:code1,
              name:name1,
            });
            newAssessmentCode.save();
          }
        });
      }

      // else if(file.name === "Faculties.xlsx")
      // {
      //   //by here the file name is residency
      //   //increment the counter
      //   counter++;
      //   self.set('count',counter);
      //   //set the label to genders
      //   label = "Please upload Departments.xlsx";
      //   self.set('filetobeloaded',label);
      //
      //   sheet_name_list.forEach(function (sheetName) {
      //     var worksheet = workbook.Sheets[sheetName];
      //
      //     // //get the range of the worksheet
      //     var range = XLSX.utils.decode_range(worksheet["!ref"]);
      //     // //loop from start of the range to the end of the range
      //     for(var R = (range.s.r+1); R <= range.e.r; R++)
      //     {
      //       var name1 =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})].v;
      //
      //       let newFaculty = self.get('store').createRecord('faculty',{
      //         name:name1,
      //       });
      //       newFaculty.save();
      //     }
      //   });
      // }

      else if(file.name === "Departments.xlsx")
      {
        setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 1000);
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload ProgramAdministrations.xlsx";
        self.set('filetobeloaded',label);

        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];
          var nameArray =[]; var facultyArray=[];
          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          for(var R = (range.s.r+1); R <= range.e.r; R++)
          {
            var name1 =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})].v;
            var faculty1 = worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
            nameArray[nameArray.length] = name1;
            facultyArray[facultyArray.length] = faculty1;

            var newDepartment = self.get('store').createRecord('department',{
              name:name1,
            });
            newDepartment.save();
          }


          //start finding the faculty from cache
          // var allfaculty = self.get('store').peekAll('faculty');
          // for (let i=0;i<facultyArray.length;i++)
          // {
          //   for(let j=0;j<allfaculty.get('length');j++)
          //   {
          //     if(allfaculty.objectAt(j).get('name')== facultyArray[i])
          //     {
          //       let currentfaculty = allfaculty.objectAt(j);
          //       let newDepartment = self.get('store').createRecord('department',{
          //         name:nameArray[i],
          //       });
          //       newDepartment.save();
          //     }
          //   }
          // }
        });
      }

      else if(file.name === "ProgramAdministrations.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Please upload UndergraduateRecordAdjudications.xlsx";
        self.set('filetobeloaded',label);

        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];
          var nameArray =[]; var positionArray=[]; var departmentArray=[];
          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          for(var R = (range.s.r+1); R <= range.e.r; R++)
          {
            var name1 =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})].v;
            var position1 = worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
            var department1 = worksheet[XLSX.utils.encode_cell({c: 2, r:R})].v;
            nameArray[nameArray.length] = name1;
            positionArray[positionArray.length] = position1;
            departmentArray[departmentArray.length] = department1;
          }

          //start finding the faculty from cache
          var alldepartment = self.get('store').peekAll('department');
          for (let i=0;i<nameArray.length;i++)
          {
            for(let j=0;j<alldepartment.get('length');j++)
            {
              if(alldepartment.objectAt(j).get('name')== departmentArray[i])
              {
                let currentdepartment = alldepartment.objectAt(j);
                let newProgramAdministration = self.get('store').createRecord('program-administration',{
                  name:nameArray[i],
                  position:positionArray[i],
                  dept: currentdepartment,
                });
                if(j==alldepartment.get('length')-1)
                {
                  newProgramAdministration.save().then(function(){
                    self.set('showLoader',false);
                    self.set('showUpload',true);
                  });
                }
                else{
                  newProgramAdministration.save();
                }
              }
            }
          }
        });
      }

      else if(file.name === "UndergraduateRecordAdjudications.xlsx")
      {
        //by here the file name is residency
        //increment the counter
        counter++;
        self.set('count',counter);
        //set the label to genders
        label = "Done !";
        self.set('filetobeloaded',label);

        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];
          var studentnumArray =[]; var termArray=[]; var termAVGArray=[];
          var termUnitsPassedArray =[]; var termUnitsTotalArray=[];
          var termAdjudicationArray = []; var index =0;
          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          for(var R = (range.s.r+1); R <= range.e.r; R++)
          {
            var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})].v;
            var termcode = worksheet[XLSX.utils.encode_cell({c: 1, r:R})].v;
            var termavg = worksheet[XLSX.utils.encode_cell({c: 2, r:R})].v;
            var termunitspassed = worksheet[XLSX.utils.encode_cell({c: 3, r:R})].v;
            var termunitstotoal = worksheet[XLSX.utils.encode_cell({c: 4, r:R})].v;
            var termadjudication = worksheet[XLSX.utils.encode_cell({c: 5, r:R})];
            if(termadjudication != null)
            {
              termadjudication = termadjudication.v;
            }

            studentnumArray[index] = studentnum;
            termArray[index] = termcode;
            termAVGArray[index] = termavg;
            termUnitsPassedArray[index] = termunitspassed;
            termUnitsTotalArray[index] = termunitstotoal;
            termAdjudicationArray[index] = termadjudication;

            index++;
          }

          //get all student from chache
          var allstudent = self.get('store').peekAll('student');
          var allterm = self.get('store').peekAll('term');
          var allassessmentcode = self.get('store').peekAll('assessment-code');

          for(let i=0;i<studentnumArray.length;i++)
          {
            var currentStudent;
            for(let j=0;j<allstudent.get('length');j++)
            {
              if(allstudent.objectAt(j).get('number') == studentnumArray[i])
              {
                currentStudent = allstudent.objectAt(j);
              }
            }
            //after getting the student info
            var currentTerm;
            for(let j=0;j<allterm.get('length');j++)
            {
              if(allterm.objectAt(j).get('term').get('name') == termArray[i] && allterm.objectAt(j).get('studentInfo').get('number') == studentnumArray[i] )
              {
                currentTerm = allterm.objectAt(j);
              }
            }



            let newAdjudication = self.get('store').createRecord('adjudication',{
              //date: new Date(),
              termAVG: termAVGArray[i],
              termUnitPassed:termUnitsPassedArray[i],
              termUnitsTotal: termUnitsTotalArray[i],
              note: termAdjudicationArray[i],
              studentInfo: currentStudent,
              semester: currentTerm,
              //comment:DS.belongsTo('assessment-code'),
            });
            if(i==studentnumArray.get('length')-1)
            {
              newAdjudication.save().then(function(){
                self.set('showLoader',false);
                self.set('showUpload',true);
              });
            }
            else{
              newAdjudication.save();
            }
          }
        });
      }
    },

    //end of the read file function

    deleteall:function(){
      var self = this;
      //each time the delete is called, show loading and hide loader
      this.set('showLoader',true);
      this.set('showUpload',false);
      setTimeout(function(){self.set('showLoader',false);self.set('showUpload',true);}, 20000);
      //delete has to be called before uploading
      //when delete is call, increment the counter so the uploading will work
      var counter = this.get('count');
      counter=1;
      this.set('count',counter);
      var label = this.get('filetobeloaded');
      label = "Please upload residencies.xlsx";
      this.set('filetobeloaded',label);
      //when user start uploading the file, delete all original data in the db
      //delete all student record
      this.get('store').query('student', {
        limit: 9007199254740992, //this is the max int in javascript
        offset: 0
      }).then(function (record) {
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all gender record
      this.get('store').findAll('gender').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all residency record
      this.get('store').findAll('residency').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all scholarship-award record
      this.get('store').findAll('scholarship-award').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all advanced-standing record
      this.get('store').findAll('advanced-standing').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all high-school-course record
      this.get('store').findAll('high-school-course').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all high-school-subject record
      this.get('store').findAll('high-school-subject').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all hscourse-grade record
      this.get('store').findAll('hscourse-grade').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all secondary-school record
      this.get('store').findAll('secondary-school').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all plan-code record
      this.get('store').findAll('plan-code').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all program-record record
      this.get('store').findAll('program-record').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });


      //delete all term-code record
      this.get('store').findAll('term-code').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all course-code record
      this.get('store').findAll('course-code').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all grade record
      this.get('store').findAll('grade').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all term record
      this.get('store').findAll('term').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all program administration
      this.get('store').findAll('program-administration').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all department
      this.get('store').findAll('department').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all faculty
      this.get('store').findAll('faculty').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all assessment code
      this.get('store').findAll('assessment-code').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all logical expression
      this.get('store').findAll('logical-expression').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });

      //delete all adjudication
      this.get('store').findAll('adjudication').then(function(record){
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });
    },

  }
  //end of actions
});
