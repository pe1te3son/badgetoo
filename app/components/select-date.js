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

  init () {
    this._super();
    this.get('userSettings').timePeriods().then(response => {
      // Sort by latest on top
      this.set('timePeriods', response.sortBy('begins').reverse());

      // Create array of years
      this.set('years', response.uniqBy('year'));
    });
  actions: {
    monthSelected (value) {
      this.timePeriodBtn(true);
      this.set('timePeriodChanged.month', parseInt(value));
    },

    yearSelected (value) {
      this.timePeriodBtn(true);
      this.set('timePeriodChanged.year', parseInt(value));
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
