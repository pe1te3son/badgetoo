import Ember from 'ember';

export function inflationIcon (params) {
  if (params[0] === null) {
    return Ember.String.htmlSafe('<i class="cur-rates-item-icon nochange" aria-hidden="true"></i>');
  }
  return params[0] ? Ember.String.htmlSafe('<i class="material-icons cur-rates-item-icon falling" aria-hidden="true">arrow_downward</i>') : Ember.String.htmlSafe('<i class="material-icons cur-rates-item-icon rising" aria-hidden="true">arrow_upward</i>');
}

export default Ember.Helper.helper(inflationIcon);
