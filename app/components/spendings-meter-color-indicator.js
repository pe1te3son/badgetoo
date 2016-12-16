import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  userSettings: Ember.inject.service(),

  didReceiveAttrs () {
    let currentValue = this.get('value');

    return this.get('userSettings').monthlyExpensesLimit()
      .then(response => {
        let elWidth = parseInt(currentValue / response * 100);
        $('#indicator-setter').css({
          width: `${elWidth <= 100 ? 100 - elWidth : 0}%`
        });
      });
  }
});
