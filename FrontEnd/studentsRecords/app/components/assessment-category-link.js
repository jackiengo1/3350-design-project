import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  adjudicationCategoryModel:null,
  assenmentCodeModel:null,
  selectedName:null,
  selectedResulet:null,
  selectedAssessmentCode:null,
  selectedAssessmentArray:Ember.A(),

  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('adjudication-category').then(function(records){
      self.set('adjudicationCategoryModel',records);
    });

    this.get('store').findAll('assessment-code').then(function(records){
      self.set('assessmentCodeModel',records);
    });
  },

  actions:{
    deleteCategory(category){
      var choice = confirm('Are you sure you want to delete this?');
      if (choice) {
        let temp = category;
        temp.deleteRecord();
        temp.save();
      }
    },

    deleteAssessmentFromArray(assessment){
      this.get('selectedAssessmentArray').removeObject(assessment);
    },

    selectAssessment(assessment){
      this.set('selectedAssessmentCode',assessment);
    },

    addToAssessmentCodeArray(){
      let assessmentobj = this.get('store').peekRecord('assessment-code',this.get('selectedAssessmentCode'));
      this.get('selectedAssessmentArray').pushObject(assessmentobj);
    },

    addAdjudicationCategory(){
      var assessmentArray = this.get('selectedAssessmentArray');
      var categoryName = this.get('selectedName');
      let newCategory = this.get('store').createRecord('adjudication-category',{
        name: categoryName,
      });
      newCategory.save().then(function(record){
        //connect the assessment in the category
        for(let i=0;i<assessmentArray.get('length');i++)
        {
          let tempassess = assessmentArray.objectAt(i);
          tempassess.set('adjudicationCategory',newCategory);
          tempassess.save();
        }
      });
    },

  },
});
