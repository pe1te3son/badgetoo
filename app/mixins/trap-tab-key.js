import Ember from 'ember';
import $ from 'jquery';

export default Ember.Mixin.create({
  focusableElementQuery: 'select:not([disabled]), button:not([disabled]), [tabindex="0"], input:not([disabled]), a[href]',
  lockBackground (obj) {
    const element = document.getElementById(obj.elementId);
    this.set('trapElementID', obj.elementId);
    this.set('focusableElements', element.querySelectorAll(this.get('focusableElementQuery')));
    let backgroundActiveEl = document.activeElement;

    // Focus first element in modal
    if (obj.hasOwnProperty('focusFirst')) {
      if (obj.focusFirst !== false) {
        this.get('focusableElements')[0].focus();
      }
    } else {
      this.get('focusableElements')[0].focus();
    }

    $(element).keydown(event => {
      // If Esc pressed
      if (event.keyCode === 27) {
        backgroundActiveEl.focus();
        $(`#${obj.elementId}`).off('keydown');
        obj.callback.call(this);
        return;
      }

      // Trap Tab key while modal open
      this.trapTabKey(event);

      event.stopPropagation();
    });
  },

  trapTabKey (event) {
    if (event.keyCode === 9) {
      if (event.shiftKey) {
        if (document.activeElement === this.get('focusableElements')[0]) {
          event.preventDefault();
          return this.get('focusableElements')[this.get('focusableElements').length - 1].focus();
        }
      } else {
        if (document.activeElement === this.get('focusableElements')[this.get('focusableElements').length - 1]) {
          event.preventDefault();
          return this.get('focusableElements')[0].focus();
        }
      }
    }
  },

  updateRegisteredKeys () {
    const element = document.getElementById(this.get('trapElementID'));
    return this.set('focusableElements', element.querySelectorAll(this.get('focusableElementQuery')));
  }
});
