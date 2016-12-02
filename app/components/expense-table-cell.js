import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  attributeBindings: ['tabindex'],

  click () {
    this.sendAction('action', this.get('expenseId'));
  willRender () {
    this.set('menuOptionID', `${this.get('elementId')}-options`);
  },

  keyDown (event) {
    if (event.which === 13) {
      this.sendAction('action', this.get('expenseId'));
  backgroundLock () {
    const backgroundActiveEl = document.activeElement;
    const optionsMenu = document.getElementById(this.get('menuOptionID'));
    const focusableElements = optionsMenu.querySelectorAll('button:not([disabled])');
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    // Focus first element in menu
    optionsMenu.addEventListener('keydown', (event) => {
      // If Esc pressed
      if (event.keyCode === 27) {
        event.stopPropagation();
        $('.activated').removeClass('activated');
        return backgroundActiveEl.focus();
      }

      // Trap Tab key while menu open
      this.trapTabKey(event, firstEl, lastEl);
    });
  },

  trapTabKey (event, ...params) {
    const [ firstEl, lastEl ] = params;

    if (event.keyCode === 9) {
      if (event.shiftKey) {
        if (document.activeElement === firstEl) {
          event.preventDefault();
          return lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          event.preventDefault();
          return firstEl.focus();
        }
      }
    }
  }
});
