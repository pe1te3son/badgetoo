import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel () {
    this.createStoreSorted({
      dbName: 'expensesDb',
      dbStore: 'expenses'
    });
  },

  createStoreSorted (object) {
    return idb.open(object.dbName, 1, upgradeDB => {
      upgradeDB.createObjectStore(object.dbStore, {keyPath: 'timestamp'}).createIndex('by-date', 'timestamp');
      console.log(`${object.dbName} Created!`);
    })
      .then(() => {
        return console.log(`${object.dbName} Opened!`);
      });
  },

  createStore (object) {
    return idb.open(object.dbName, 1, upgradeDB => {
      upgradeDB.createObjectStore(object.dbStore);
      console.log(`${object.dbName} Created!`);
    })
    .then(() => {
      return console.log(`${object.dbName} Opened!`);
    });
  }
});
