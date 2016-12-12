import Ember from 'ember';
import $ from 'jquery';
import trapTabKey from '../mixins/trap-tab-key';

export default Ember.Component.extend(trapTabKey, {
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
    this.trapTabKey({elementId: this.get('elementId')}, () => {
      // Close dialog on exit
      return el.fadeOut(100);
    });
  }
});
