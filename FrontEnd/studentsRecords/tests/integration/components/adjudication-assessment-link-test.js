import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('adjudication-assessment-link', 'Integration | Component | adjudication assessment link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{adjudication-assessment-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#adjudication-assessment-link}}
      template block text
    {{/adjudication-assessment-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
