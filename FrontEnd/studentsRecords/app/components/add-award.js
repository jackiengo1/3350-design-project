import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  note: null,
  studentInfo: null,
  num: null,
  init() {
    this._super(...arguments);
    // load Residency data model
    var self = this;
  },

  // actions: {
  //   addAward(){
  //     var newAward = this.get('store').createRecord('scholarship-award', {
  //
  //       num : this.get('studentNumber');
  //
  //       note: this.get('awardNote'),
  //       studentInfo: this.get('')
  //     });
  //     newAward.save();
  //   }
  // }
// });
});
