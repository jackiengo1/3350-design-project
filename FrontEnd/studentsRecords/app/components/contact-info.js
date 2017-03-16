import Ember from 'ember';

export default Ember.Component.extend({
  VCI01IsPermitted: Ember.computed(function(){ //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("VCI01") >= 0);
    }
  })
});
