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

  actions: {
    closeSettings () {
      this.transitionToRoute('home');
    },

    updateSetting (obj) {
      return this.store.findRecord('setting', 'st-setting')
        .then(response => {
          response.set(obj.propertyName, obj.value);
          response.save();
          return this.settingsSnackbar('Settings changed');
        });
    }
  }
});
