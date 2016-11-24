import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  attributeBindings: ['role'],
  didInsertElement () {
    const $emEl = this.$();
    const $modalBtn = $('[em-modal-open]');

    $emEl.attr('role', 'dialog');
    $modalBtn.click(() => {
      $emEl.fadeIn(100);
    });

    $emEl.click(event => {
      if (!$(event.target).parents(`#${this.$().attr('id')}`).length) {
        $emEl.fadeOut(100);
      }
    });
  }
});
