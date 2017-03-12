import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  /* golbal XLSX */

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
          let firsttime = false;
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
            var res;
            var gen;
            //find the residency according to its name in the local cache
            self.get('store').peekAll('residency').forEach(function(residency){
              if(residency.get('name') === Farray[i])
              {
                res = residency;
              }
            });

            //find the gender according to its name in the local cache
            self.get('store').peekAll('gender').forEach(function(gender){
              if(gender.get('name') === Darray[i])
              {
                gen = gender;
              }
            });
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
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                console.log(studentnum);
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
                newASRecord.save();
              }
            }
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
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                console.log(studentnum);
                //student record used for the targeted student
                var studentRecord = allStudentRecord.objectAt(j);
                var newAwardRecord = self.get('store').createRecord('scholarship-award', {
                  note: note,
                  studentInfo: studentRecord,
                });
                newAwardRecord.save();
              }
            }
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
            var unit = worksheet[XLSX.utils.encode_cell({c: 3, r:R})].v;
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
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                console.log(studentnum);
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
                studentRecord.save();
              }
            }
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
            //get all student from the local store cache
            var allStudentRecord =self.get('store').peekAll('student');
            for(let j=0;j<allStudentRecord.get('length');j++)
            {
              //if the stduent number matches
              if(studentnum == allStudentRecord.objectAt(j).get('number'))
              {
                console.log(studentnum);
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
                                //console.log(allHighSchoolCourses.objectAt(l).get('id'));
                                var newhsCourseGrade = self.get('store').createRecord('hscourse-grade', {
                                  mark:grade,
                                  source: hscourse,
                                  studentInfo: studentRecord,
                                });
                                newhsCourseGrade.save();
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
      else if(file.name === "AdmissionAverage.xlsx")
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
            if(studentnum == null)
            {
              studentnum =  lastStudentNum;
            }
            else{
              //when student number is not null, record the student number
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
                console.log(studentnum);
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
                studentRecord.save();
              }
            }
          }
        });
      }

      else if(file.name ==="UndergraduateRecordPlans.xlsx")
      {
        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          var lastterm,lastprogram,lastlevel,lastload,lastStudentNum;
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
            else{
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


            //get all local cached student and find the student by student number
            var studentRecord;
            self.get('store').peekAll('student').forEach(function(student){
              if(student.get('number') === studentnum)
              {
                //if the stduent number matches
                studentRecord = student;
              }
            });

            //get all local cached term and find the term by name
            var termcode;
            self.get('store').peekAll('term-code').forEach(function(currentterm){
              if(currentterm.get('name') === term)
              {
                //if the stduent number matches
                termcode = currentterm;
              }
            });

            //create new plan code
            var newplancode = self.get('store').createRecord('plan-code',{
              name: plan,
            });
            var plancodearray = self.get('store').peekRecord('plan-code',newplancode);
            if(plancodearray == null)
            {
              //if none same plan code is found, save it
              newplancode.save();
            }

            //create a new program record
            var newprogramRecord = self.get('store').createRecord('program-record', {
              name: program,
              level: level,
              load: load,
              semester: [termcode],
            });
            var programrecordarray = self.get('store').peekRecord('program-record',newprogramRecord);
            if(programrecordarray == null)
            {
              //if none same program record is found, save it
              newprogramRecord.save();
            }
            //  else{
            //    //if the record exist, need to add it to the program record array in the plan code
            //    plancodearray.get('program').pushObject(newplancode);
            //  }
            //trying to do many to many not working properly, instead messing up my data for other part
            // if(plancodearray == null)
            // {
            //    if(programrecordarray == null)
            //    {
            //      //when the value is null, set it to the array of program record
            //      if(newplancode.get('program') == null){
            //        newplancode.set('program',[newprogramRecord]);
            //      }
            //      else{
            //        //if the value is not null append the record at the back of the array
            //       newplancode.get('program').pushObject(newprogramRecord);
            //      }
            //    }
            //    else{
            //      if(newplancode.get('program') == null){
            //         newplancode.set('program',[programrecordarray]);
            //      }
            //      else{
            //        newplancode.get('program').pushObject(programrecordarray);
            //      }
            //
            //    }
            //   //if none same plan code is found, save it
            //   newplancode.save();
            // }
            //
            // if(plancodearray == null)
            // {
            //   if(programrecordarray == null)
            //   {
            //     if(newprogramRecord.get('plan')==null)
            //     {
            //       newprogramRecord.set('program',[programrecordarray]);
            //     }
            //     newprogramRecord.get('plan').pushObject(newplancode);
            //     newprogramRecord.save();
            //   }
            //   else{
            //     programrecordarray.get('plan').pushObject(newplancode);
            //     programrecordarray.save();
            //   }
            // }
            // else{
            //   if(programrecordarray == null)
            //   {
            //     newprogramRecord.get('plan').pushObject(plancodearray);
            //     newprogramRecord.save();
            //   }
            //   else{
            //     programrecordarray.get('plan').pushObject(plancodearray);
            //     programrecordarray.save();
            //   }
            // }
            //
            //  //set the term code with student info
            //  termobj.set('studentInfo',tempstudent);
            //  termobj.set('program',newprogramRecord);
            //  termobj.save().then(() => {
            //  });

          }
        });
      }

      else if(file.name === "UndergraduateRecordCourses.xlsx")
      {
        sheet_name_list.forEach(function (sheetName) {
          var worksheet = workbook.Sheets[sheetName];

          // //get the range of the worksheet
          var range = XLSX.utils.decode_range(worksheet["!ref"]);
          // //loop from start of the range to the end of the range
          var lastStudentNum,lastterm;
          var studentnumArray = []; var termCodeArray = []; var courseLetterArray =[];
          var courseNumberArray =[]; var sectionArray =[]; var gradeArray =[];
          var noteArray =[]; var gradeModelArray=[]; var noteModelArray=[];
          var index =0;
          for(var R = (range.s.r+1); R < range.e.r; R++)
          {
            //student number not useful in this case
            var studentnum =  worksheet[XLSX.utils.encode_cell({c: 0, r:R})];
            var term =  worksheet[XLSX.utils.encode_cell({c: 1, r:R})];
            var courseLetter = worksheet[XLSX.utils.encode_cell({c: 2, r:R})];
            var courseNumber = worksheet[XLSX.utils.encode_cell({c: 3, r:R})];
            var section = worksheet[XLSX.utils.encode_cell({c: 4, r:R})];
            var grade = worksheet[XLSX.utils.encode_cell({c: 5, r:R})];
            var note = worksheet[XLSX.utils.encode_cell({c: 6, r:R})];

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
            else{
              lastStudentNum = studentnum;
            }
            if(term == null)
            {
              term = lastterm;
            }
            else{
              lastterm = term;
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
          for(let j=0;j<gradeModelArray.length;j++)
          {
            var newgrade = self.get('store').createRecord('grade',{
              mark: gradeModelArray[j],
              courseInfo: noteModelArray[j],
            });
            if(j == gradeModelArray.length-1)
            {
              //when it is the last run, save the data and use to call back function to chin the series of saving together
              newgrade.save().then(function(){
                //this call back can gurentee when all grade is posted to db before proceed
                for(let k=0;k<studentnumArray.length;k++)
                {
                  //get all student from the local store cache
                  var allStudentRecord =self.get('store').peekAll('student');
                  //student record used for the targeted student
                  var studentRecord;
                  //double for loop, compare each element in Aarray (student number array) to each object in all student record
                  for(let l=1;l<studentnumArray.length;l++)
                  {
                    for(let m=0;m<allStudentRecord.get('length');m++)
                    {
                      //if the stduent number matches
                      if(studentnumArray[l] == allStudentRecord.objectAt(m).get('number'))
                      {
                        //console.log("student found");
                        studentRecord = allStudentRecord.objectAt(m);
                      }
                    }
                  }

                  //start constructing the term model
                  var allTermcode = self.get('store').peekAll('term-code');
                  var currentTermCode;
                  for (let i=0;i<allTermcode.get('length');i++)
                  {
                    if(allTermcode.objectAt(i).get('name') === termCodeArray[k])
                    {
                      console.log("term found");
                      //if term code matches
                      currentTermCode = allTermcode.objectAt(i);
                      //after found the term code
                      var newterm= self.get('store').createRecord('term',{
                        term:currentTermCode,
                        studentInfo: studentRecord,
                      });
                      newterm.save();
                    }
                  }

                  // var allGradeRecord = self.get('store').peekAll('grade');
                  // var currentgrade=null;
                  // for(let l=0;l<allGradeRecord.get('length');l++)
                  // {
                  //   //if the grade mark and note matches
                  //   if(allGradeRecord.objectAt(l).get('mark') == gradeArray[k] && allGradeRecord.objectAt(l).get('note') == noteArray[k])
                  //   {
                  //     currentgrade = allGradeRecord.objectAt(l);
                  //   }
                  // }
                  // //at this point it should either get the grade object or the student has a null grade
                  // //start updating the course code grade info
                  // //get all course code from local cache
                  // var allCourseCode = self.get('store').peekAll('course-code');
                  // var currentcourse
                  // for(let m=0;m<allCourseCode.get('length');m++)
                  // {
                  //   //find the coursecode matches the table information
                  //   if(allCourseCode.objectAt(m).get('courseLetter') == courseLetterArray[k]
                  //   && allCourseCode.objectAt(m).get('courseNumber') == courseNumberArray[k])
                  //   {
                  //     currentcourse = allCourseCode.objectAt(m);
                  //     currentcourse.set('mark',currentgrade);
                  //     currentcourse.save();
                  //   }
                  // }
                }

              });
            }
            else{
              //when it isn't the last run, save it normally
              newgrade.save();
            }

          }


          //create new Course code
          // var newcoursecode = self.get('store').createRecord('course-code',{
          //   courseLetter: courseLetter,
          //   courseNumber: courseNumber,
          //   unit: section,
          //   semester: termcode,
          //   mark: newgrade,
          // });
          // newcoursecode.save();
        });
      }
    },
    //end of the read file function

    deleteall:function(){
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

    },

  }
  //end of actions
});
