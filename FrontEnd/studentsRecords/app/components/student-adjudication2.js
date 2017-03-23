import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  adjudicationModel: null,
  assessmentcodeModel: null,

  init() {
    this._super(...arguments);

    //get the adjudication model
    this.get('store').findAll('adjudication').then(function (records) {
      self.set('adjudicationModel', records);
    });

    //get the assessment code model
    this.get('store').findAll('assessment-code').then(function(records){
      self.set('assessmentcodeModel', records);
    });


    var self = this;
  },

  actions: {

//for each adjudication code, determine if an adjudication should be assigned that code
adjudicate(){

//Iterate over all adjudications
for(let i=0;i<this.get('studentModel').get('length');i++)
{

  //store current adjudication in temp
  var temp = this.get('studentModel').objectAt(i);
  var term = temp.term

  //get the courses and grades for the term related to that adjudication
  var term = temp.semester;
  var courses = term.courseInfo;

    //iterate over each assessment code
    for (let l = 0; l < this.get('assessmentcodeModel').get('length'); l++){
      var temp2 = this.get('assessmentcodeModel').objectAt(l);
      var a = eval(temp2.testExpression);

      if (a){
        temp.set('comment', temp2);
        break;
      }
}
}
}

    /*  //get the array of leafs and the array of links
      var leafArray = temp2.testExpression.leaf;
      var logicalLinks = temp2.testExpression.links;

      //declare array to hold operators and operand for each leaf
      var operatorA = [];//courses
      var operatorB = [];//mark required
      var operand = [];
      //array of 1s and 0s based on meeting a particular leaf requirement
      var results = [];

      //array storing result of applying logical links to successive results
      var results2 = [];

      //bool storing whether results2 is all true or not
      var results3;
      //go through the leaf array and split each index into 3 arrays
      for(let k = 0; k < leafArray.get('length'); k++){
        var sp = leafArray[k].split(" ");

        //put operatora, b, and operand into correct array
        operatorA.push(sp[0]);
        if(sp[1]=='r'){
          operatorB.push("0");
        }
        else{
          operatorB.push(sp[2]);
        }
        operand.push(sp[1]);
      }

      //for each group of operatora, operand, operatorb check if statement is true or false
      for(let n = 0; n < operatorA.get('length'); n++){
        var theCourse;
        //set theCourse to the sent course
        for(let b = 0; b < courses.get('length'); b++){
          if(courses[b].name == operatorA){
            theCourse = courses[b];
            break;
          }
        }
        //if course was required
        if(operand[n] == "0"){
          if(theCourse.mark >= 50){
            results.push(1);
          }
          else{
            results.push(0);
          }
        }
        //otherwise a certain mark was required
        else{
          //evaluate that mark vs the requirement
          if(operand[n] == ">"){
            var a = eval("thecourse.mark > operatorB[n]");
            if(a){
              results.push(1);
            }
            else{
              results.push(0);
            }
          }
        }

      }

      //compute results2 ie store result of leaf logicallink leaf
      for(let x = 0; x + 1 < results.get('length'); x++){
        if(logicalLinks[x] == "AND"){
          if(results[x] && results[x+1]){
            results2[x] = 1;
          }
          else{
            results2[x] = 0;
          }
        }
        else{
          if(results[x] || results[x+1]){
            results2[x] = 1;
          }
          else{
            results2[x] = 0;
          }
        }
      }

      //check if everything is true
      for(let a = 0; a < results2.get('length'); a++){
        results3 = true;
        if(results2[a]!= 1){
          results3 = false;
          break;
        }
      }

      //if it is, set this code and break the loop
      if(results3)
      {
        //set + save
        temp.set('comment', temp2);
        temp.save();
        break;
      }
    }//end of for assessment loop
}//end of for adjudication loop
*/
}

});
