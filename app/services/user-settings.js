import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  currency () {
    return '$';
  },

  monthBegins () {
    return 5;
  },

  timePeriods () {
    let storedValues = this.get('store').peekAll('expenses');

    let timePeriods = [];
    storedValues.forEach(value => {
      let begins = moment(`${value.get('id')}-${this.monthBegins()}`, 'YYYY-MM-DD').toDate().getTime();
      let ends = moment(begins).add(1, 'months').subtract(1, 'seconds').toDate().getTime();
      let year = moment(begins).format('YYYY');
      timePeriods.pushObject({begins, ends, year});
    });

    return timePeriods;
  }
});
