import Ember from 'ember';

export default Ember.Component.extend({
  userSettings: Ember.inject.service('user-settings'),

  didReceiveAttrs () {
    const currency = this.get('userSettings').currency();
    this.set('currency', currency);
  }
});
