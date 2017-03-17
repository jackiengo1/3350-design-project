import Ember from 'ember';

export default Ember.Component.extend({

actions:{
  selectLogicalExpression(logic){
    var selectedTerm = this.get('store').peekRecord('term', term);
    this.get('store').query('course-code',{filter:{semester:selectedTerm.get('id')}});
    this.set('studentCourseCodeForGrade', selectedTerm.get('courseInfo'));
  },
}
});
