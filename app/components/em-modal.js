import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  attributeBindings: ['role'],
  didInsertElement () {
    const $Element = this.$();
    const $modalBtn = $(`[em-modal-open=${$Element.attr('id')}]`);
    const $closeBtn = this.$().find('.em--close-modal');

    $Element.attr('role', 'dialog');
    $modalBtn.click(() => {
      this.openModal($Element);
    });

    $Element.click(event => {
      if (!$(event.target).parents(`#${this.$().attr('id')}`).length) {
        this.closeModal();
      }
    });

    $closeBtn.click(() => {
      this.closeModal();
    });
  },

  closeModal () {
    this.$().fadeOut(100);
  },

  openModal (el) {
    el.fadeIn(100);
    this.lockBackground(el);
  },

  lockBackground (el) {
    const focusableElementQuery = 'select:not([disabled]), button:not([disabled]), [tabindex="0"], input:not([disabled]), a[href]';
    const backgroundActiveEl = document.activeElement;
    const focusableElements = el.find(focusableElementQuery);
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    // Focus first element in modal
    firstEl.focus();
    el.keydown(event => {
      // If Esc pressed
      if (event.keyCode === 27) {
        backgroundActiveEl.focus();
        el.fadeOut(100);
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
