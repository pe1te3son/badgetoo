import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  attributeBindings: ['dialog-open'],
  didInsertElement () {
    var dialog = document.getElementById(this.$().attr('id'));
    var showDialogButton = $('[dialog-open]');
    console.log(dialog, showDialogButton);
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.click(function () {
      dialog.showModal();
    });
    // dialog.querySelector('.close').addEventListener('click', function () {
    //   dialog.close();
    // });
    $(dialog).on('click', function () {
      dialog.close();
    });
    componentHandler.upgradeAllRegistered()
  }
});
