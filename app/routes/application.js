import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel () {
    return this.store.findRecord('setting', 'st-setting')
      .catch(err => {
        console.log('Settings set to default');
        // Save default if doesnt exist
        if (typeof err === 'undefined') {
          let record = this.store.createRecord('setting', {
            id: 'st-setting'
          });
          record.save();
        }
      });
  }
});
