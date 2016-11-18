import Ember from 'ember';
// import $ from 'jquery';

export default Ember.Component.extend({
  expense: {
    sum: null,
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
  didInsertElement () {
    componentHandler.upgradeAllRegistered();
  },

  actions: {
    clearInputs () {
      this.$('.mdl-textfield input[type=text]').val('');
      this.$('.mdl-textfield').removeClass('is-dirty');
    },
    addExpense () {
      console.log(this.get('expense'));
    }
  }
});
