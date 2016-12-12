import Ember from 'ember';
import $ from 'jquery';
import trapTabKey from '../mixins/trap-tab-key';

export default Ember.Component.extend(trapTabKey, {
  tagName: 'tr',

  errorMessages: {
    emRequired: 'This field can\'t be blank',
    emPattern: 'Must be a number!'
  },

  editModeValues: {},
  actions: {
    openOptions (event) {
      this.$().addClass('activated');
      this.$().siblings('.activated').removeClass('activated');

      $(window).one('click', () => {
        $('.activated').removeClass('activated');
      });

      event.stopPropagation();
      this.trapTabKey({
        elementId: `${this.get('elementId')}-options`,
        focusFirst: false
      }, () => {
        $('.activated').removeClass('activated');
        return;
      });
    },

    edit (boolean) {
      this.set('editMode', boolean);

      // Exit if false
      if (!boolean) { return; }
      const expense = this.get('expense');

      this.set('editModeValues', {
        sum: expense.get('sum'),
        category: expense.get('category'),
        name: expense.get('name')
      });
      Ember.run.later(() => {
        componentHandler.upgradeAllRegistered();
      }, 100);
    },
    update () {
      const editModeValues = this.get('editModeValues');

      // If has error exit
      if (this.$().find('.is-invalid').length) { return; }
      this.sendAction('action', {
        action: 'updateRecord',
        payload: {
          id: this.get('expense').id,
          name: editModeValues.name,
          category: editModeValues.category,
          sum: parseFloat(editModeValues.sum).toFixed(2)
        }
      });
      this.set('editMode', false);
    },
    remove () {
      this.sendAction('action', {
        action: 'removeRecord',
        payload: {
          id: this.get('expense').id
        }
      });
    }
  }
});
