import Ember from 'ember';
import $ from 'jquery';
import moment from 'npm:moment';

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

  setContentView (data) {
    if (!data) { return; }

    let dataToDisplay;
    switch (this.get('tableViewSettings')) {
      case 'today':
        dataToDisplay = data.filter((item, index, enumerable) => {
          let currentTimestamp = item.get('timestamp');
          return moment(currentTimestamp).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
        });
        break;

      case 'week':
        let oldestAllowed = moment().subtract(7, 'days').toDate().getTime();
        dataToDisplay = data.filter((item, index, enumerable) => {
          return item.get('timestamp') >= oldestAllowed;
        });
        break;

      default:
        dataToDisplay = data;
    }
    return dataToDisplay;
  }
});
