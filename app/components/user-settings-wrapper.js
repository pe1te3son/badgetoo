import Ember from 'ember';
import trapTabKey from '../mixins/trap-tab-key';
import $ from 'jquery';

export default Ember.Component.extend(trapTabKey, {

  didInsertElement () {
    const _this = this;
    const trapKeyCallback = function () {
      _this.sendAction('action');
      Ember.run.later(() => {
        $('.st--main-nav').children().first().focus();
      }, 100);
    };

    this.lockBackground({
      elementId: 'user-settings-cont',
      callback: trapKeyCallback
    });

    $('.settings-item').click(function () {
      Ember.run.later(() => {
        _this.updateRegisteredKeys();
        $(this).find('input').focus();
      }, 100);
    });
  }
});
