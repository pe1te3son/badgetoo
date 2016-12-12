import Ember from 'ember';

export default Ember.Component.extend({
  userSettings: Ember.inject.service(),
  tagName: 'li',
  editMode: false,

  actions: {
    editMode (boolean) {
      this.set('editMode', boolean);
    },

    updateSetting () {
      const originalValue = this.get('setting.value');
      const newValue = this.get('valueChanged');

      if (originalValue !== newValue) {
        this.set('setting.value', newValue);
        this.sendAction('action', this.get('setting'));
      }
      this.send('editMode', false);
    },

    currencySelected (value) {
      this.set('valueChanged', value);
    }
  },

  didInsertElement () {
    this.set('currencyNames', this.get('userSettings').currencyNames());
    // Set initial value to compare on update
    this.set('valueChanged', this.get('setting.value'));
  },

  isInEditMode: function () {
    if (this.get('editMode')) {
      Ember.run.later(() => {
        this.$().find(`option[value=${this.get('setting.value')}]`).attr('selected', 'selected');
      });
    }
  }.observes('editMode')

});
