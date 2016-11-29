import Ember from 'ember';

export default Ember.Component.extend({
  userSettings: Ember.inject.service('user-settings'),
  sortAscending: false,

  init () {
    this._super();
    this.set('currency', this.get('userSettings').currency());
  },

  actions: {
    sortByProperty (property) {
      this.sortValues(property);
    }
  },

  sortValues (property) {
    if (this.get('sortAscending')) {
      const dataSorted = this.get('data').sortBy(property);
      this.set('data', dataSorted);
    } else {
      const dataSorted = this.get('data').sortBy(property).reverse();
      this.set('data', dataSorted);
    }

    this.set('sortAscending', !this.get('sortAscending'));
  }
});
