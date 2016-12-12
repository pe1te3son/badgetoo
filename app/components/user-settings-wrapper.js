import Ember from 'ember';
import trapTabKey from '../mixins/trap-tab-key';
import $ from 'jquery';

export default Ember.Component.extend(trapTabKey, {

  didInsertElement () {
    const _this = this;

    this.trapTabKey({elementId: 'user-settings-cont'}, () => {
      this.sendAction('action');
      Ember.run.later(() => {
        $('.st--main-nav').children().last().focus();
      }, 100);
    });

    $('.settings-item').click(function () {
      Ember.run.later(() => {
        _this.updateRegisteredKeys();
        $(this).find('input').focus();
      }, 100);
    });
  }
});
