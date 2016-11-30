import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  attributeBindings: ['tabindex'],

  click () {
    this.sendAction('action', this.get('expenseId'));
  },

  keyDown (event) {
    if (event.which === 13) {
      this.sendAction('action', this.get('expenseId'));
    }
  }
});
