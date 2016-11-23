import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({

  containsError: null,

  hasError: null,

  errorMessages: {
    emMin: 'Too short!',
    emMax: 'Too long!',
    emRequired: 'This field can\'t be blank',
    emPattern: 'Pattern does not match'
  },


    this.$().closest('form').find('button[type=submit]').on('click', () => {
      this.$().addClass('is-touched');
      this.runValidation();
    });
  filterInvalidInputs () {
    let containsError = {};
    const findInvalidValues = this.get('needToValidate').filterBy('isInvalid', true);
    findInvalidValues.forEach(item => {
      containsError[item.name] = true;
    });
    this.set('containsError', containsError);
    return findInvalidValues.length ? this.set('hasError', true) : this.set('hasError', false);
  },

  emMin (value) {
    if (this.get('validate')) {
      return this.get('validate').length < parseInt(value);
    }
  },

  emMax (value) {
    return this.get('validate').length > parseInt(value);
  },

  emPattern (value) {
    const reg = new RegExp(`${value}`);
    if (this.get('validate').length) {
      return !reg.test(this.get('validate'));
    }
  },

  emRequired () {
    if (this.$().hasClass('is-touched')) {
      return this.get('validate').length < 1;
    }
  }
});
