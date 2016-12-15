import Ember from 'ember';

export default Ember.Component.extend({
  editMode: false,

  isValid: function () {
    let value = this.get('value');
    let pattern = this.get('pattern');

    if (pattern) {
      const reg = new RegExp(`${pattern}`);
      return reg.test(value);
    }

    if (!value.length) {
      return false;
    }

    return true;
  }.property('value'),

  actions: {
    editMode (boolean) {
      this.set('editMode', boolean);
    },

    updateSetting () {
      this.sendAction('action', {
        value: this.get('value'),
        propertyName: this.get('propertyName')
      });
      this.send('editMode', false);
    }
  }
});
