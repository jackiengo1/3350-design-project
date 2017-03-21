import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,

});

Router.map(function() {
  //this.route('home', {path: '/'});

  this.route('posts');
  this.route('about');
  /*this.route('contact', function() {
    this.route('phone');
    this.route('email');
  });*/

  this.route('post', {
    path: 'posts/:post_id'
  });
  this.route('import');
  this.route('admin-portal');
  this.route('home');
  this.route('login', {path: '/'});
  this.route('user');
    this.route('no-path', {path: "*path" });
});

export default Router;
