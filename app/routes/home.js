import Ember from 'ember';

export default Ember.Route.extend({

  model () {
    return this.get('store').findAll('expense');
    // return this.get('store').findAll('expense')
    //   .then(response => response.filter(expense => {
    //     console.log('dfa');
    //     return moment(expense.get('timestamp')).isBetween('2016-11-05', '2016-11-29');
    //   }));
  }
});
