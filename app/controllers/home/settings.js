import Ember from 'ember';

export default Ember.Controller.extend({
  init () {
    Ember.run.schedule('afterRender', () => {
      componentHandler.upgradeAllRegistered();
    });
  },

  currency: function () {
    let currency = this.get('model').findBy('id', 'currency');
    if (!currency) {
      return {
        id: false,
        setting: 'Currency',
        value: '£'
      };
    }
    return currency;
  }.property('model.@each.value'),

  userName: function () {
    let userName = this.get('model').findBy('id', 'user-name');

    if (!userName) {
      return {
        id: false,
        setting: 'Name',
        value: 'Guest'
      };
    }
    return userName;
  }.property('model.@each.value')
});
