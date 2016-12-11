import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-settings-wrapper', 'Integration | Component | user settings wrapper', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user-settings-wrapper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#user-settings-wrapper}}
      template block text
    {{/user-settings-wrapper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
