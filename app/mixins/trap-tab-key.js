import Ember from 'ember';
import $ from 'jquery';
export default Ember.Mixin.create({

  lockBackground (obj) {
    const focusableElementQuery = 'select:not([disabled]), button:not([disabled]), [tabindex="0"], input:not([disabled]), a[href]';
    const element = document.getElementById(obj.elementId);
    const backgroundActiveEl = document.activeElement;
    const focusableElements = element.querySelectorAll(focusableElementQuery);
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    // Focus first element in modal
    firstEl.focus();
    $(element).keydown(event => {
      // If Esc pressed
      if (event.keyCode === 27) {
        backgroundActiveEl.focus();
        obj.callback.call(this);
        return;
      }

      // Trap Tab key while modal open
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
