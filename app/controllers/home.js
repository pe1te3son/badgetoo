import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  spendingsMeter: 0,
  init () {
    Ember.run.schedule('afterRender', () => {

    });
  },

  watchAddSpending: function () {
    this.updateSpendingsMeter();
  }.observes('model.@each'),

  updateSpendingsMeter () {
    let sumCounted = 0;
    this.get('model').forEach(item => {
      sumCounted += parseInt(item.get('sum'));
    });
    this.set('spendingsMeter', sumCounted);
    return;
  },

    saveRecord (record) {
      let newExpense = this.store.createRecord('expense', record);
      newExpense.save();
    }
  }
});
