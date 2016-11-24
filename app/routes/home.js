import Ember from 'ember';

export default Ember.Route.extend({
  userSettings: Ember.inject.service('user-settings'),

  model () {
    return this.get('store').findAll('expense');
  },

  setupController: function (controller, model) {
   // Call _super for default behavior
    this._super(controller, model);
   // Implement your custom setup after
    this.controllerFor('home').set('currency', this.get('userSettings').currency());
  }
});
