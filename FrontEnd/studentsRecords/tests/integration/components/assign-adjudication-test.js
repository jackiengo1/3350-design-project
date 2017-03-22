import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('assign-adjudication', 'Integration | Component | assign adjudication', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{assign-adjudication}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#assign-adjudication}}
      template block text
    {{/assign-adjudication}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
