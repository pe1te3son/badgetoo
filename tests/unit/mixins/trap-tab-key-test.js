import Ember from 'ember';
import TrapTabKeyMixin from 'spendings-tracker/mixins/trap-tab-key';
import { module, test } from 'qunit';

module('Unit | Mixin | trap tab key');

// Replace this with your real tests.
test('it works', function (assert) {
  let TrapTabKeyObject = Ember.Object.extend(TrapTabKeyMixin);
  let subject = TrapTabKeyObject.create();
  assert.ok(subject);
});
