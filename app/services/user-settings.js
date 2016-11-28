import Ember from 'ember';

export default Ember.Service.extend({
  currency () {
    return '$';
  },

  monthBegins () {
    return 5;
  }
});
