import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  courseModel:null,
  boolExpression:Ember.A(["=",">","<",">=","<=","Required"]),

  selectedBooleanSymbol:null,
  selectedLogicalExpression:null,

  init() {
    this._super(...arguments);
    // load Residency data model
    var self = this;
    this.get('store').findAll('course-code').then(function (records) {
      self.set('courseModel', records);
    });
  },

  actions:{

    selectLogicalExpression(logic){
      var selectedTerm = this.get('store').peekRecord('logical-expression', logic);
      this.get('store').query('course-code',{filter:{semester:selectedTerm.get('id')}});
      this.set('studentCourseCodeForGrade', selectedTerm.get('courseInfo'));
    },

    selectBooleanSymbol(bool){
      var selectedTerm = this.get('store').peekRecord('term', term);
      this.get('store').query('course-code',{filter:{semester:selectedTerm.get('id')}});
      this.set('studentCourseCodeForGrade', selectedTerm.get('courseInfo'));
    },
  }
});
