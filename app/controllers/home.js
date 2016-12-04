import Ember from 'ember';
import $ from 'jquery';
import moment from 'npm:moment';

export default Ember.Controller.extend({
  spendingsMeter: 0.00,
  sumByCategory: null,

  watchAddSpending: function () {
    this.updateSpendingsMeter();
  }.observes('model.@each.sum'),

  updateSpendingsMeter () {
    let sumCounted = 0;
    let sumByCategory = [];
    this.get('model').forEach(item => {
      let sum = item.get('sum');
      let category = item.get('category');

      if (sumByCategory.findBy('category', category)) {
        sumByCategory.findBy('category', category).sum += parseFloat(sum);
      } else {
        sumByCategory.pushObject({
          category,
          sum: parseFloat(sum)
        });
      }
      sumCounted += parseFloat(sum);
    });
    this.set('spendingsMeter', sumCounted);
    this.set('sumByCategory', sumByCategory);
    return;
  },

  formatedChartData: function () {
    const data = [
      ['Category', 'Spendings']
    ];

    this.get('sumByCategory').forEach(category => {
      data.push(
        [category.category, category.sum]
      );
    });
    return data;
  }.property('sumByCategory'),

  actions: {
    test () {
      const _this = this;
      $('#trains-date-picker').pickadate({
        min: () => {
          return new Date();
        },
        onSet: function (date) {
          _this.set('datepickerValue', date.select);
        }
      });
    },

    saveRecord (record) {
      const currentDateId = moment().format('YYYY-MM');

      if (this.store.peekRecord('expenses', currentDateId) === null) {
        let expensesStore = this.store.createRecord('expenses', {
          id: currentDateId
        });
        expensesStore.save();
      }
      let expensesThisMonth = this.store.peekRecord('expenses', currentDateId);
      let expense = this.store.createRecord('expense', record);
      expensesThisMonth.get('expenses').pushObject(expense);
      expense.save();
    }
  }
});
