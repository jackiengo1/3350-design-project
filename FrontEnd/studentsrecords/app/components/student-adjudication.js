import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  adjudicationModel: null,
  assessment-codeModel: null,

  init() {
    this._super(...arguments);

    //get the adjudication model
    this.get('store').findAll('adjudication').then(function (records) {
      self.set('adjudicationModel', records);
    });

    //get the assessment code model
    this.get('store').findAll('assessment-code').then(function(records){
      self.set('assessment-codeModel', records);
    });

    var self = this;
  },

  actions: {

//for each adjudication code, determine if an adjudication should be assigned that code
adjudicate(){

//Iterate over all adjudications
for(let i=0;i<this.get('adjudicationModel').get('length');i++)
{

  var temp = this.get('adjudicationModel').objectAt(i);
  var studentNumber = temp.studentInfo.number;

  //get the courses and grades for the term related to that adjudication
  var term = temp.semester;
  var courses = term.courseInfo;

  //only use those with the specified term
  if(temp.term == "specifiedTerm"){

    //iterate over each assessment code
    for (let l = 0; l < this.get('assessment-codeModel').get('length'); l++){
      var temp2 = this.get('assessment-codeModel').objectAt(l);

      //get the array of leafs and the array of links
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
        var sp = leafArray[l].split(" ");

        //put operatora, b, and operand into correct array
        for (let j = 0; j < sp.get('length'); j++){
          if(j == 1){
            if(sp[j] != "r"){
            operand.push(sp[j]);
          }
          else operand.push(0);
          }
          else if(j == 2){
            operatorB.push(sp[j]);
          }
          else{
            operatorA.push[sp[j]];
          }
        }
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
          var a =eval("theCourse.mark operand[n] operatorB[n]");
          if (a){
            results.push(1);
          }
          else{
            results.push(0);
          }
        }

      }

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
      if(let a = 0; a < results2.get('length'); a++){
        if(results2[a] == 1){
          results3 = true;
        }
        else{
          results3 = false;
          break;
        }
      }

      //if it is, set this code
      if(results3)
      {
        temp.set('comment', temp2);
      }
    }
  }
}

  }
}
