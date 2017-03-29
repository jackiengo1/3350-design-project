import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('logical-expression-2', 'Integration | Component | logical expression 2', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{logical-expression-2}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#logical-expression-2}}
      template block text
    {{/logical-expression-2}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
