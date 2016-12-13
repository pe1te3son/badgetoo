import Ember from 'ember';
import moment from 'npm:moment';
import $ from 'jquery';

export default Ember.Component.extend({
  userSettings: Ember.inject.service(),
  currenciesFiltered: null,

  didReceiveAttrs () {
    let data = this.get('data.rates');
    // Get all currency names and set handlebars usable object
    this.get('userSettings').currencyNames()
      .then(response => {
        let values = [];
        response.forEach(currency => {
          values.pushObject({
            currency,
            value: data[currency]
          });
        });
        return this.set('latestCurrencyRates', values);
      })
      .then(() => {
        return this.get('userSettings').currentCurrencyName()
          .then(userCurrencyName => this.fetchPreviousDayCurrencyRates(userCurrencyName));
      });
  },

  fetchPreviousDayCurrencyRates (userCurrencyName) {
    return $.ajax(`https://api.fixer.io/${moment().subtract(2, 'day').format('YYYY-MM-DD')}?base=${userCurrencyName}`, {
      dataType: 'jsonp'
    })
      .done(response => {
        this.calculateInflationRates(response.rates);
      })
      .fail(() => {
        console.log('Failed to fetch previous day rates');
      });
  },
  calculateInflationRates (latesRates) {
    let handlebarsReadyRates = this.get('latestCurrencyRates');
    handlebarsReadyRates.forEach(item => {
      if (item.value === latesRates[item.currency]) {
        item.hasFallen = null;
      } else {
        item.hasFallen = item.value < latesRates[item.currency];
      }
    });

    this.set('currenciesFiltered', handlebarsReadyRates);
    return;
  }
});
