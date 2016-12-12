import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  currency () {
    return this.get('store').findRecord('setting', 'currency-symbol')
      .then(response => response.get('value'))
      .catch(err => {
        if (typeof err === 'undefined') {
          return '$';
        }
      });
  },

  currencyNames () {
    return ['AUD', 'CAD', 'CHF', 'EUR', 'GBP', 'JPY', 'NZD', 'RUB', 'USD'];
  }
});
