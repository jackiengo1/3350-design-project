import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('enable-disable-account', 'Integration | Component | enable disable account', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{enable-disable-account}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#enable-disable-account}}
      template block text
    {{/enable-disable-account}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
