import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  editMode: false,

  actions: {
    editMode (boolean) {
      this.set('editMode', boolean);
    },

    updateSetting () {
      this.sendAction('action', this.get('setting'));
      this.send('editMode', false);
    }
  }
});
