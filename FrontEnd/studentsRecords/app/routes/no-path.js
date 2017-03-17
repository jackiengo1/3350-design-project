import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.get('oudaAuth').get('isAuthenticated')=== true) {
      console.log("h");
      this.transitionTo('home');
    }
    if (this.get('oudaAuth').get('isAuthenticated')=== false) {
        console.log("i");
      this.transitionTo('home');

    }
  }
});
