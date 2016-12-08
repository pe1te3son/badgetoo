import Ember from 'ember';
import moment from 'npm:moment';

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
  },

  monthBegins () {
    return 5;
  },

  timePeriods () {
    return this.get('store').findAll('expenses').then(response => {
      let timePeriods = [];
      response.forEach(value => {
        let begins = moment(`${value.get('id')}-${this.monthBegins()}`, 'YYYY-MM-DD').toDate().getTime();
        let ends = moment(begins).add(1, 'months').subtract(1, 'seconds').toDate().getTime();
        let year = moment(begins).format('YYYY');

        if (moment(begins).isBefore(moment())) {
          timePeriods.pushObject({begins, ends, year});
        }
      });

      return timePeriods;
    });
  }

});
