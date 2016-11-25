import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  init () {
    Ember.run.schedule('afterRender', () => {
      $('#settings-link').click(function () {
        $(this).toggleClass('settings-active');
      });
    });
  }
});
