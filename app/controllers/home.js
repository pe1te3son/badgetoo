import Ember from 'ember';
import moment from 'npm:moment';
import $ from 'jquery';

export default Ember.Controller.extend({
  userSettings: Ember.inject.service(),
  spendingsMeter: 0.00,
  sumByCategory: null,
  pollingInterval: 60000,
  currencyRates: null,
  copyrightYear: moment().format('YYYY'),

  init () {
    this.set('currentMonthDisplaying', {
      month: parseInt(moment().format('MM')),
      year: parseInt(moment().format('YYYY')),
      isInPast: false
    });
    Ember.run.once(() => {
      this.get('userSettings').currentCurrencyName()
        .then(currencyName => {
          this.set('pollUrl', `https://api.fixer.io/${moment().format('YYYY-MM-DD')}?base=${currencyName}`);
          this.onPoll();
        });
    });
    //this.startPolling();
  },

  schedulePollEvent (event, interval) {
    var eventInterval = interval || this.get('pollingInterval');
    return Ember.run.later(() => {
      event.apply(this);
      this.set('timer', this.schedulePollEvent(event));
    }, eventInterval);
  },

  startPolling (interval) {
    this.set('timer', this.schedulePollEvent(this.get('onPoll'), interval));
  },

  stopPolling () {
    Ember.run.cancel(this.get('timer'));
  },

  onPoll () {
    const _this = this;
    return $.get(_this.get('pollUrl'))
      .then(response => _this.set('currencyRates', response))
      .catch(err => console.log(err));
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

  // ACTIONS
  actions: {

    timePeriodHasChanged (timePeriod) {
      this.set('currentMonthDisplaying', timePeriod);
      this.set('model', this.store.findAll('expense'));
    },

    saveRecord (record) {
      let setTimePeriodRecord = record;

      // If timeperiod is in past it will set correct month and year for expense on save
      // otherwise default value is set in model
      if (this.get('currentMonthDisplaying').isInPast) {
        setTimePeriodRecord.month = this.get('currentMonthDisplaying').month;
        setTimePeriodRecord.year = this.get('currentMonthDisplaying').year;
      }

      let expense = this.store.createRecord('expense', setTimePeriodRecord);
      expense.save();
    }
  }// ACTIONS
});
