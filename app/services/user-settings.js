import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currencies: ['AUD', 'CAD', 'CHF', 'EUR', 'GBP', 'JPY', 'NZD', 'RUB', 'USD'],

  currencySymbol () {
    return this.get('store').findRecord('setting', 'st-setting')
      .then(response => response.get('currencySymbol'))
      .catch(err => {
        if (typeof err === 'undefined') {
          return '$';
        }
      });
  },

  currentCurrencyName () {
    return this.get('store').findRecord('setting', 'st-setting')
      .then(response => response.get('currencyName'))
      .catch(err => {
        if (typeof err === 'undefined') {
          return 'USD';
        }
      });
  },

  currencyNames (value) {
    return this.get('store').findRecord('setting', 'st-setting')
      .then(response => {
        if (value === 'all') {
          return this.get('currencies');
        }

        return this.get('currencies').filter(item => item !== response.get('currencyName'));
      })
      .catch(err => {
        if (typeof err === 'undefined') {
          if (value === 'all') {
            return this.get('currencies');
          }

          return this.get('currencies').filter(item => item !== 'USD');
        }
      });
  },

  monthlyExpensesLimit () {
    return this.get('store').findRecord('setting', 'st-setting')
      .then(response => response.get('monthlyLimit'))
      .catch(err => {
        if (typeof err === 'undefined') {
          return 1000;
        }
      });
  }

});
