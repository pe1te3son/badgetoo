import Ember from 'ember';
import $ from 'jquery';
import moment from 'npm:moment';

export default Ember.Component.extend({
  userSettings: Ember.inject.service('user-settings'),
  store: Ember.inject.service(),
  sortAscending: false,
  searchQuery: '',
  tableViewSettings: 'today',
  sortByProperty: false,

  init () {
    this._super();
    this.get('userSettings').currency()
      .then(response => this.set('currency', response));
  },

  actions: {
    sortByProperty (property) {
      this.set('sortByProperty', property);
    },

    tableViewSettings (settings) {
      if (this.get('tableViewSettings') === settings) { return; }

      $('.table-view-settings button').removeClass('mdl-button--raised');
      $(`#btn-${settings}`).addClass('mdl-button--raised');
      this.set('tableViewSettings', settings);
    },

    cellAction (payload) {
      this.send(payload.action, payload.payload);
    },

    updateRecord (payload) {
      this.get('store').findRecord('expense', payload.id, { reload: true })
        .then(record => {
          record.set('name', payload.name);
          record.set('category', payload.category);
          record.set('sum', parseFloat(payload.sum).toFixed(2));
          record.save();
        });
    },

    removeRecord (payload) {
      this.get('store').findRecord('expense', payload.id)
        .then(record => {
          record.destroyRecord();
        });
    }
  },

  applyPropertyFilter (data, property) {
    if (property) {
      this.set('sortAscending', !this.get('sortAscending'));
      if (this.get('sortAscending')) {
        return data.sortBy(property);
      } else {
        return data.sortBy(property).reverse();
      }
    } else {
      return data.sortBy('timestamp').reverse();
    }
  },

  tableContent: function () {
    const filter = this.get('searchQuery');
    const data = this.setContentView(this.get('data'));
    const filterPropety = this.get('sortByProperty');

    /*
      Reset property filter each time content changes or is being filtered. It
      ensures that latest item is always on top when another filter is being
      applied or expense is added to db
    */
    this.set('sortByProperty', false);

    // Filter by search field value if not empty
    if (filter.length) {
      // Display data based on searchQuery
      let filteredContent = data.filter(function (item) {
        return item.get('name').toLowerCase().match(filter.toLowerCase()) || item.get('category').toLowerCase().match(filter.toLowerCase());
      });
      return this.applyPropertyFilter(filteredContent, filterPropety);
    }

    // Display latest on top
    return this.applyPropertyFilter(data, filterPropety);
  }.property('searchQuery', 'data.@each', 'tableViewSettings', 'sortByProperty'),

  setContentView (data) {
    if (!data) { return; }

    let dataToDisplay;
    switch (this.get('tableViewSettings')) {
      case 'today':
        dataToDisplay = data.filter((item) => {
          let currentTimestamp = item.get('timestamp');
          return moment(currentTimestamp).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
        });
        break;

      case 'week':
        let oldestAllowed = moment().subtract(7, 'days').toDate().getTime();
        dataToDisplay = data.filter((item) => {
          return item.get('timestamp') >= oldestAllowed;
        });
        break;

      default:
        dataToDisplay = data;
    }
    return dataToDisplay;
  }
});
