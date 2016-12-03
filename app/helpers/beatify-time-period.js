import Ember from 'ember';
import moment from 'npm:moment';

export function beatifyTimePeriod (params) {
  return moment(params[0].begins).format('DD MMM') + ' - ' + moment(params[0].ends).format('DD MMM');
}

export default Ember.Helper.helper(beatifyTimePeriod);
