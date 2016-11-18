import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  init () {
    Ember.run.schedule('afterRender', () => {
    });
    saveRecord (record) {
      let newExpense = this.store.createRecord('expense', record);
      newExpense.save();
    }
  }
});
