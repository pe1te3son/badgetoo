import Ember from 'ember';
import moment from 'npm:moment';

export function beatifyTimePeriod (params) {
  return moment(params[0], 'MM').format('MMMM');
}

export default Ember.Helper.helper(beatifyTimePeriod);
