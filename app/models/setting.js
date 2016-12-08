import DS from 'ember-data';

export default DS.Model.extend({
  setting: DS.attr('string'),
  value: DS.attr('string')
});
