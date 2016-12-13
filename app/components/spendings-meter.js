import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({
  userSettings: Ember.inject.service('user-settings'),

  didReceiveAttrs () {
    this.get('userSettings').currencySymbol()
      .then(response => this.set('currency', response));

    this.set('todaysDate', {
      dayName: moment().format('dddd'),
      date: moment().format('MMMM Do YYYY')
    });
  }
});
