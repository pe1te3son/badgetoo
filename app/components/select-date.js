import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({
  btnActive: false,
  didReceiveAttrs () {
    let timePeriodChanged = {
      year: this.get('currentDate').year,
      month: this.get('currentDate').month
    };

    if (!this.get('timePeriods').length) {
      this.get('timePeriods').push([
        moment().format('YYYY'),
        moment().format('MM')
      ]);
    }
    this.set('timePeriodChanged', timePeriodChanged);
  },

  didInsertElement () {
    this.$().find(`option[value=${this.get('currentDate').year}]`).attr('selected', 'selected');
    this.$().find(`option[value=${this.get('currentDate').month}]`).attr('selected', 'selected');
    componentHandler.upgradeAllRegistered();
  },

  uniqYears: function () {
    let years = [];
      // Filter out duplicates
    this.get('timePeriods').forEach(timeperiod => {
      if (years.indexOf(timeperiod[0]) === -1) {
        years.push(timeperiod[0]);
      }
    });
    this.setUniqMonths();
    return years;
  }.property('timePeriods'),

  // Only show months for year selected
  uniqMonths: null,
  setUniqMonths () {
    let currentYear = this.get('timePeriodChanged').year;

    let months = [];
    this.get('timePeriods').forEach(timeperiod => {
      if (timeperiod[0] === parseInt(currentYear) && months.indexOf(timeperiod[1]) === -1) {
        months.push(timeperiod[1]);
      }
    });
    this.set('uniqMonths', months);
    return;
  },

  actions: {
    monthSelected (value) {
      this.timePeriodBtn(true);
      this.set('timePeriodChanged.month', parseInt(value));
    },

    yearSelected (value) {
      this.timePeriodBtn(true);
      this.set('timePeriodChanged.year', parseInt(value));
      this.setUniqMonths();
    },

    changeTimePeriod () {
      this.timePeriodBtn(false);
      const timePeriod = this.get('timePeriodChanged');

      if (moment(`${timePeriod.year}-${timePeriod.month}`, 'YYYY-MM').isSame(moment().format('YYYY-MM'))) {
        timePeriod.isInPast = false;
      } else {
        timePeriod.isInPast = true;
      }
      this.sendAction('action', timePeriod);
    }
  },

  timePeriodBtn (boolean) {
    // Run only if value differs
    if (this.get('btnActive') !== boolean) {
      this.set('btnActive', boolean);
    }
  }
});
