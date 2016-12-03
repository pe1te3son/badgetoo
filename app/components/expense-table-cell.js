import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  tagName: 'tr',

  errorMessages: {
    emRequired: 'This field can\'t be blank',
    emPattern: 'Must be a number!'
  },

  editModeValues: {},
  actions: {
    openOptions (event) {
      this.$().addClass('activated');
      this.$().siblings('.activated').removeClass('activated');

      $(window).one('click', () => {
        $('.activated').removeClass('activated');
      });

      event.stopPropagation();
      this.backgroundLock();
    },

    edit (boolean) {
      this.set('editMode', boolean);

      // Exit if false
      if (!boolean) { return; }
      const expense = this.get('expense');

      this.set('editModeValues', {
        sum: expense.get('sum'),
        category: expense.get('category'),
        name: expense.get('name')
      });
      Ember.run.later(() => {
        componentHandler.upgradeAllRegistered();
      }, 100);
    },
    update () {
      const editModeValues = this.get('editModeValues');

      // If has error exit
      if (this.$().find('.is-invalid').length) { return; }
      this.sendAction('action', {
        action: 'updateRecord',
        payload: {
          id: this.get('expense').id,
          name: editModeValues.name,
          category: editModeValues.category,
          sum: parseFloat(editModeValues.sum).toFixed(2)
        }
      });
      this.set('editMode', false);
    },
    remove () {
      this.sendAction('action', {
        action: 'removeRecord',
        payload: {
          id: this.get('expense').id
        }
      });
    }
  },

  backgroundLock () {
    const backgroundActiveEl = document.activeElement;
    const optionsMenu = document.getElementById(`${this.get('elementId')}-options`);
    const focusableElements = optionsMenu.querySelectorAll('button:not([disabled])');
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

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
