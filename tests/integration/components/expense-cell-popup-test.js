import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expense-cell-popup', 'Integration | Component | expense cell popup', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expense-cell-popup}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#expense-cell-popup}}
      template block text
    {{/expense-cell-popup}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
