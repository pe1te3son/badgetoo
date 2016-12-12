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
        isDefault: true,
        id: 'currency',
        setting: 'Currency',
        value: 'USD'
      };
    }
    return currency;
  }.property('model'),

  currencySymbol: function () {
    let currencySymbol = this.get('model').findBy('id', 'currency-symbol');

    if (!currencySymbol) {
      return {
        isDefault: true,
        id: 'currency-symbol',
        setting: 'Currency Symbol',
        value: '$'
      };
    }
    return currencySymbol;
  }.property('model'),

  userName: function () {
    let userName = this.get('model').findBy('id', 'user-name');

    if (!userName) {
      return {
        isDefault: true,
        id: 'user-name',
        setting: 'Name',
        value: 'Guest'
      };
    }
    return userName;
  }.property('model'),

  actions: {
    closeSettings () {
      this.transitionToRoute('home');
    },

    updateSetting (obj) {
      let payload = obj;

      if (payload.isDefault) {
        payload.isDefault = false;
        let record = this.store.createRecord('setting', payload);
        record.save();
        return;
      }

      return this.store.findRecord('setting', payload.get('id'))
        .then(response => {
          response.set('value', payload.get('value'));
          response.save();
        })
        .then(this.settingsSnackbar('Settings changed.'))
        .catch(err => {
          console.log(err);
          this.settingsSnackbar('Ooops. Something went wrong.');
        });
    }
  }
});
