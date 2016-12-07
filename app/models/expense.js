import DS from 'ember-data';
import moment from 'npm:moment';

export default DS.Model.extend({
  timestamp: DS.attr('number', {
    defaultValue () { return moment(/*'2016-11-24', 'YYYY-MM-DD'*/).toDate().getTime(); }
  }),
  month: DS.attr('number', {
    defaultValue () { return parseInt(moment().format('MM')); }
  }),
  year: DS.attr('number', {
    defaultValue () { return parseInt(moment().format('YYYY')); }
  }),
  name: DS.attr('string'),
  category: DS.attr('string'),
  sum: DS.attr('number')
});
