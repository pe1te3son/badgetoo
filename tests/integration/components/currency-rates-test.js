import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('currency-rates', 'Integration | Component | currency rates', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{currency-rates}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#currency-rates}}
      template block text
    {{/currency-rates}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
