import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({

  validationAttributes: ['em-pattern', 'em-min', 'em-max', 'em-required'],

  needToValidate: {},

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

    let needToValidate = [];

    $(input).each(function () {
      $.each(this.attributes, function () {
        if (this.specified) {
          if (_this.get('validationAttributes').indexOf(this.name) !== -1) {
            needToValidate.pushObject({
              name: this.name.camelize(),
              value: this.value,
              isInvalid: false
            });
          }
        }
      });
    });

    this.set('needToValidate', needToValidate);
  },

  didUpdateAttrs () {
    this.runValidation();
  },

  runValidation () {
    this.get('needToValidate').forEach(item => {
      item.isInvalid = this[item.name](item.value);
    });

    this.filterInvalidInputs();
    this.setErrorCssClass();
  },

  setErrorCssClass () {
    return this.get('hasError') ? this.$().addClass('is-invalid') : this.$().removeClass('is-invalid');
  },

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
