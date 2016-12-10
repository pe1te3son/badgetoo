import Ember from 'ember';
import $ from 'jquery';

/**
* @name trapTabKey
* @desc Traps tab key within comoponent
* @param { string } elementId - id of element to trap key presses
* @param { boolean } focusFirst - Whether to focus first focusable element or not. Default = true
* @param { function } callback - function to be called on ESC
*/
export default Ember.Mixin.create({
  focusableElementQuery: 'select:not([disabled]), button:not([disabled]), [tabindex="0"], input:not([disabled]), a[href]',
  lockBackground (options, callback) {
    const element = document.getElementById(options.elementId);
    this.set('trapElementID', options.elementId);
    this.set('focusableElements', element.querySelectorAll(this.get('focusableElementQuery')));
    let backgroundActiveEl = document.activeElement;

    // Focus first element in modal
    if (options.hasOwnProperty('focusFirst')) {
      if (options.focusFirst !== false) {
        this.get('focusableElements')[0].focus();
      }
    } else {
      this.get('focusableElements')[0].focus();
    }

    $(element).keydown(event => {
      // If Esc pressed
      if (event.keyCode === 27) {
        backgroundActiveEl.focus();
        $(`#${options.elementId}`).off('keydown');
        callback.call(this);
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
