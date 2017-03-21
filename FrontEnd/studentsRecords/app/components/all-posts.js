import Ember from 'ember';

export default Ember.Component.extend({

  VP001IsPermitted: Ember.computed(function(){ //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("VP001") >= 0);
    }
  })

});