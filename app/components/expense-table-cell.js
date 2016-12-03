import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  tagName: 'tr',

  },

  actions: {
    openOptions (event) {
      this.$().addClass('activated');
      this.$().siblings('.activated').removeClass('activated');

      $(window).one('click', () => {
        $('.activated').removeClass('activated');
      });

      event.stopPropagation();
      this.backgroundLock();
      // this.sendAction('action', this.get('expenseId'));
    },

    edit (boolean) {
      this.set('editMode', boolean);
    },
    update () {
      const expense = this.get('expense');

      this.sendAction('action', {
        action: 'updateRecord',
        payload: {
          id: expense.get('id'),
          name: expense.get('name'),
          category: expense.get('category'),
          sum: expense.get('sum')
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
