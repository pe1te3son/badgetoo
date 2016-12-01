import DS from 'ember-data';
import moment from 'npm:moment';

export default DS.Model.extend({
  month: DS.attr('number', {
    defaultValue () { return parseInt(moment().format('MM')); }
  }),
  year: DS.attr('number', {
    defaultValue () { return parseInt(moment().format('YYYY')); }
  }),
  expenses: DS.hasMany('expense')
});
