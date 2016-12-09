import Ember from 'ember';

export default Ember.Controller.extend({
  init () {
    Ember.run.schedule('afterRender', () => {
      componentHandler.upgradeAllRegistered();
    });
  },

  settingsSnackbar (message) {
    const _this = this;
    const snackbarContainer = document.querySelector('#snackbar-container');

    const handler = function () {
      _this.transitionToRoute('home');
      Ember.run.later(() => {
        window.location.reload(true);
      }, 500);
    };

    const data = {
      message,
      timeout: 4000,
      actionHandler: handler,
      actionText: 'Reload'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
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
