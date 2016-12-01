import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Route.extend({

  beforeModel () {
    const currentDateId = moment().format('YYYY-MM');

    if (this.store.peekRecord('expenses', currentDateId) === null) {
      let expensesStore = this.store.createRecord('expenses', {
        id: currentDateId
      });
      expensesStore.save();
    }
  },

  model () {
    return this.get('store').findAll('expense');
    // return this.get('store').findAll('expense')
    //   .then(response => response.filter(expense => {
    //     console.log('dfa');
    //     return moment(expense.get('timestamp')).isBetween('2016-11-05', '2016-11-29');
    //   }));
  }
});
