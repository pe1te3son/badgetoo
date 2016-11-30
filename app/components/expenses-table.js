import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  userSettings: Ember.inject.service('user-settings'),
  sortAscending: false,
  searchQuery: '',
  tableViewSettings: 'all',

  init () {
    this._super();
    this.set('currency', this.get('userSettings').currency());
  },

  actions: {
    sortByProperty (property) {
      this.sortValues(property);
    },

    tableViewSettings (settings) {
      if (this.get('tableViewSettings') === settings) { return; }

      $('.table-view-settings button').removeClass('mdl-button--raised');
      $(`#btn-${settings}`).addClass('mdl-button--raised');
      this.set('tableViewSettings', settings);
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
  },

  tableContent: function () {
    let filter = this.get('searchQuery');
    let data = this.setContentView(this.get('data'));

    if (this.get('searchQuery').length) {
      // Display data based on searchQuery
      let filteredContent = data.filter(function (item, index, enumerable) {
        return item.get('name').toLowerCase().match(filter.toLowerCase()) || item.get('category').toLowerCase().match(filter.toLowerCase());
      });
      return filteredContent;
    }

    // Display latest on top
    // Default values if search field empty
    return data;
  }.property('searchQuery', 'data.@each', 'tableViewSettings'),
  }
});
