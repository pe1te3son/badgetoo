import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  editMode: false,

  actions: {
    editMode (boolean) {
      this.set('editMode', boolean);
    },

    updateSetting () {
      console.log(this.get('setting').id);
      this.send('editMode', false);
    }
  }
});
