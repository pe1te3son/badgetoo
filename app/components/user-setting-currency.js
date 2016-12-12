import Ember from 'ember';

export default Ember.Component.extend({
  userSettings: Ember.inject.service(),
  editMode: false,

  actions: {
    editMode (boolean) {
      this.set('editMode', boolean);
    },

    updateSetting () {
      const originalValue = this.get('value');
      const newValue = this.get('valueChanged');

      if (originalValue !== newValue) {
        this.set('value', newValue);
        this.sendAction('action', {
          propertyName: this.get('propertyName'),
          value: this.get('valueChanged')
        });
      }
      this.send('editMode', false);
    },

    currencySelected (value) {
      this.set('valueChanged', value);
    }
  },

  didInsertElement () {
    this.get('userSettings').currencyNames('all')
      .then(response => this.set('currencyNames', response));

    // Set initial value to compare on update
    this.set('valueChanged', this.get('value'));
  },

  isInEditMode: function () {
    if (this.get('editMode')) {
      Ember.run.later(() => {
        this.$().find(`option[value=${this.get('value')}]`).attr('selected', 'selected');
      });
    }
  }.observes('editMode')

});
