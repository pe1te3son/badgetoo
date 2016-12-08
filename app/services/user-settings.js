import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  currency () {
    return this.get('store').findRecord('setting', 'currency')
      .then(response => response.get('value'))
      .catch(err => {
        if (typeof err === 'undefined') {
          return '$';
        }
      });
  }
});
