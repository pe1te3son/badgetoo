import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({
  userSettings: Ember.inject.service('user-settings'),

  didReceiveAttrs () {
    const currency = this.get('userSettings').currency();
    this.set('currency', currency);
    this.set('todaysDate', {
      dayName: moment().format('dddd'),
      date: moment().format('MMMM Do YYYY')
    });
  }
});
