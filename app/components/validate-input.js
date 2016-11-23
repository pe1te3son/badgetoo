import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({

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
