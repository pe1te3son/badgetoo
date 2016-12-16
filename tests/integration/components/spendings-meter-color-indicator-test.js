import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('spendings-meter-color-indicator', 'Integration | Component | spendings meter color indicator', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{spendings-meter-color-indicator}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#spendings-meter-color-indicator}}
      template block text
    {{/spendings-meter-color-indicator}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
