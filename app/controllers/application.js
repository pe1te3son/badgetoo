import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  init () {
    // Extend embers input helper with custom tags
    Ember.TextSupport.reopen({
      attributeBindings: ['em-required', 'em-min', 'em-max', 'em-pattern']
    });
    Ember.run.schedule('afterRender', () => {
      $('#settings-link').click(function () {
        $(this).toggleClass('settings-active');
      });
    });
  }
});
