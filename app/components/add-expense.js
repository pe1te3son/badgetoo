import Ember from 'ember';

export default Ember.Component.extend({
  userSettings: Ember.inject.service('user-settings'),

  expense: {
    sum: '',
    category: '',
    name: ''
  },

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
    emRequired: 'Select or add your own category'
  },

  init () {
    this._super();
    this.set('currency', this.get('userSettings').currency());
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
      Ember.run.later(() => {
        if (!this.$().find('.is-invalid').length) {
          let sum = this.get('expense').sum;
          this.set('expense.sum', parseFloat(sum).toFixed(2));
          this.sendAction('action', this.get('expense'));
          this.send('clearInputs');
        }
      }, 200);
    }
  }
});
