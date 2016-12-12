import Ember from 'ember';

export default Ember.Component.extend({
  userSettings: Ember.inject.service(),
  currenciesFiltered: null,

  didReceiveAttrs () {
    let data = this.get('data.rates');
    // Get all currency names and set handlebars usable object
    this.get('userSettings').currencyNames()
      .then(response => {
        let values = [];
        response.forEach(cur => {
          values.pushObject({
            cur,
            value: data[cur]
          });
        });
        return this.set('currenciesFiltered', values);
      });
  }
});
