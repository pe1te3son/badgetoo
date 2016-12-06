import Ember from 'ember';

export default Ember.Controller.extend({
  spendingsMeter: 0.00,
  sumByCategory: null,

  init () {
    this.set('currentMonthDisplaying', {
      month: 12,
      year: 2016,
      isInPast: false
    });
  },

  dataToDisplay: function () {
    let month = this.get('currentMonthDisplaying').month;
    let year = this.get('currentMonthDisplaying').year;
    let timePeriodsList = [];

    // Filter expenses for current month and generate timePeriodsList while you at it.
    let filteredData = this.get('model').filter(item => {
      // Save values to be reused
      let timePeriod = [item.get('year'), item.get('month')];

      // Determine if timeperiod is alredy on the list
      let notOnList = timePeriodsList.every(arr => {
        if (arr[0] !== timePeriod[0]) {
          return true;
        } else {
          // if arr[0] === timePeriod[0]
          return arr[1] !== timePeriod[1];
        }
      });

      // Save if not on list
      if (notOnList) {
        timePeriodsList.push(timePeriod);
      }

      // Returns false if expense is not for current month
      return timePeriod[0] === year && timePeriod[1] === month;
    });

    this.set('timePeriodsList', timePeriodsList);
    return filteredData;
  }.property('model.@each'),

  updateSpendingsMeter: function (data) {
    let sumCounted = 0;
    let sumByCategory = [];
    this.get('dataToDisplay').forEach(item => {
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
  }.observes('model.@each.sum'),

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
