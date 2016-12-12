import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-setting-currency', 'Integration | Component | user setting currency', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user-setting-currency}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#user-setting-currency}}
      template block text
    {{/user-setting-currency}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
