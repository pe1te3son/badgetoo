import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Route.extend({
  userSettings: Ember.inject.service(),

  model () {
    return this.get('store').findAll('expenses')
      .then(data => {
        return data.store.findAll('expense');
      });
  }
});
