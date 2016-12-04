import Ember from 'ember';

export default Ember.Component.extend({
  userSettings: Ember.inject.service(),

  init () {
    this._super();
    this.get('userSettings').timePeriods().then(response => {
      // Sort by latest on top
      this.set('timePeriods', response.sortBy('begins').reverse());

      // Create array of years
      this.set('years', response.uniqBy('year'));
    });
  }
});
