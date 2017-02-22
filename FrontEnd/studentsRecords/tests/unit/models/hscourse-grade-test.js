import { moduleForModel, test } from 'ember-qunit';

moduleForModel('hscourse-grade', 'Unit | Model | hscourse grade', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
