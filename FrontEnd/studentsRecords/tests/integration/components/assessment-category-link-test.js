import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('assessment-category-link', 'Integration | Component | assessment category link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{assessment-category-link}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#assessment-category-link}}
      template block text
    {{/assessment-category-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
