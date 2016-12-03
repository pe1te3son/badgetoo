import Ember from 'ember';

export default Ember.Component.extend({
  userSettings: Ember.inject.service(),

  init () {
    this._super();
    let periods = this.get('userSettings').timePeriods();

    // Sort by latest on top
    this.set('timePeriods', periods.sortBy('begins').reverse());

    // Create array of years
    this.set('years', periods.uniqBy('year'));
  }
});
