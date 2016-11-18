import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('number', {
    defaultValue () { return Date.now(); }
  }),
  name: DS.attr('string'),
  category: DS.attr('string'),
  sum: DS.attr('number')
});
