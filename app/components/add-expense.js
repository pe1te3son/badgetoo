import Ember from 'ember';
// import $ from 'jquery';

export default Ember.Component.extend({
  expense: {
    sum: '',
    category: '',
    name: ''
  },
  currency: '£',
  expenseCategories: [
    'Charity',
    'Clothing',
    'Education',
    'Events',
    'Food',
    'Gifts',
    'Healthcare',
    'Household',
    'Leisure',
    'Hobbies',
    'Trasportation',
    'Utilities',
    'Vacation'
  ],

  errorMessagesSum: {
    emRequired: 'This field can\'t be blank',
    emPattern: 'Must be a number!'
  },

  errorMessagesCategory: {
    emRequired: 'Must select a category'
  },

  init () {
    this._super();
    Ember.TextSupport.reopen({
      attributeBindings: ['em-required', 'em-min', 'em-max', 'em-pattern']
    });
  },

  didInsertElement () {
    componentHandler.upgradeAllRegistered();
  },

  actions: {
    clearInputs () {
      this.set('expense', {
        sum: '',
        category: '',
        name: ''
      });
      this.$('.mdl-textfield').removeClass('is-dirty is-invalid is-touched');
    },
    addExpense () {
      this.sendAction('action', this.get('expense'));
      this.send('clearInputs');
    }
  }
});
