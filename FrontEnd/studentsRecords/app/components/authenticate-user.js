// Manage the behaviour of the login screen
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  isPasswordChanging: null,
  tempPassword: null,
  error: null,

  errorMessage: Ember.computed('error', function () {
    return this.get('error');
  }),

  didRender() {
    this._super(...arguments);
    Ember.$('.ui.modal')
      .modal({
        closable: false,
        transition: 'horizontal flip'
      })
      .modal('show');
  },

  actions: {
    login() {
      var authentication = this.get('oudaAuth');
      var self = this;
      var success = false;
      if (this.get('name') === "root") {
        authentication.openRoot(this.get('password')).then(function (name) {
          success = true;
          authentication.set('getName', name);
          self.get('routing').transitionTo('home');
          Ember.$("body").css("background-color", "#EEE");
        }, function (error) {
          self.set('error', error);
        });
      } else {
        authentication.open(this.get('name'), this.get('password')).then(function () {
          authentication.set('getName', self.get('name'));
          self.set('error', null);
          self.get('routing').transitionTo('home');
          Ember.$("body").css("background-color", "#EEE");
        }, function (error) {
          self.set('error', error);
          if (error === "passwordReset") {
            self.set('isPasswordChanging', true);
          } else {
            if (error === "wrongUserName") {
              self.set('error', 'Please enter a correct user name');
            } else {
              if (error === "wrongPassword") {
                self.set('error', 'Please enter a correct password');
              } else {
                if (error === "loginFailed") {
                  self.set('error', 'Login Failed ...');
                }
              }
            }
          }
        });
      }
      console.log(success);
    },

    save() {
      var authentication = this.get('oudaAuth');
      var myStore = this.get('store');
      var userName = this.get('name');
      var hashedPassword = authentication.hash(this.get('firstPassword'));
      var self = this;
      myStore.queryRecord('password', { filter: { userName: userName } }).then(function (userShadow) {
        userShadow.set('encryptedPassword', hashedPassword);
        userShadow.set('passwordMustChanged', true);
        userShadow.set('passwordReset', false);
        userShadow.save().then(function () {
          self.get('oudaAuth').close();
          self.set('isPasswordChanging', false);
          //self.get('routing').transitionTo('login');
          Ember.$('.ui.modal').modal('hide');
          Ember.$('.ui.modal').remove();
        });
      });
    }
  },
});

Ember.$(document).ready(function () {
  Ember.$("html").css("background-image", 'URL("/assets/images/wallpaper_1LG.png")');
  Ember.$("body").css("background-color", "transparent");
});