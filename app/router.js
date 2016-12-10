import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('home', {path: '/'}, function () {
    this.route('settings');
    this.route('currency-exchange');
  });
});

export default Router;
