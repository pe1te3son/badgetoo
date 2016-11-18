import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  didInsertElement () {
    const $emEl = this.$();
    const $modalBtn = $('[em-modal-open]');

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
