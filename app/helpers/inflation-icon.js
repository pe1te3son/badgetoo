import Ember from 'ember';

export function inflationIcon (params) {
  if (params[0] === null) {
    return Ember.String.htmlSafe('<i class="cur-rates-item-icon nochange"></i>');
  }
  return params[0] ? Ember.String.htmlSafe('<i class="material-icons cur-rates-item-icon falling">arrow_downward</i>') : Ember.String.htmlSafe('<i class="material-icons cur-rates-item-icon rising">arrow_upward</i>');
}

export default Ember.Helper.helper(inflationIcon);
