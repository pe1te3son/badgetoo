import Ember from 'ember';

export default Ember.Component.extend({
  btnActive: false,
  didReceiveAttrs () {
    this.set('timePeriodChanged', this.get('currentDate'));
  },

  init () {
    this._super();
    this.get('userSettings').timePeriods().then(response => {
      // Sort by latest on top
      this.set('timePeriods', response.sortBy('begins').reverse());

      // Create array of years
      this.set('years', response.uniqBy('year'));
    });

  timePeriodBtn (boolean) {
    // Run only if value differs
    if (this.get('btnActive') !== boolean) {
      this.set('btnActive', boolean);
    }
  }
});
