import DS from 'ember-data';

export default DS.Model.extend({
  currencyName: DS.attr('string', {
    defaultValue () { return 'USD'; }
  }),
  currencySymbol: DS.attr('string', {
    defaultValue () { return '$'; }
  }),
  userName: DS.attr('string', {
    defaultValue () { return 'Guest'; }
  }),
  monthlyLimit: DS.attr('number', {
    defaultValue () { return 1000; }
  })
});
