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
    return this.get('store').findRecord('expenses', moment().format('YYYY-MM'))
      .then(data => {
        return data.store.findAll('expense');
      });
  }
});
