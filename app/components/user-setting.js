import Ember from 'ember';

export default Ember.Component.extend({
  editMode: false,

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
