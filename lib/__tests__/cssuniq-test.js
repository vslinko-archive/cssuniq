/**
 * cssuniq by @vslinko
 */
/* global jest, describe, it, expect */

jest.autoMockOff();

var cssuniq = require('../cssuniq');

describe('cssuniq', function() {
  it('should make classes unique', function() {
    var classes = cssuniq([
      '.message { color: red; }',
      '#root .message { color: red; }',
      '#root.message { color: red; }',
      '.message:after { color: red; }',
      '@media print { .message { color: red; } }'
    ].join(' '));

    expect(classes.getStyle()).toEqual([
      '.d99d68bc-message {\n  color: red;\n}',
      '#root .d99d68bc-message {\n  color: red;\n}',
      '#root.d99d68bc-message {\n  color: red;\n}',
      '.d99d68bc-message:after {\n  color: red;\n}',
      '@media print {\n  .d99d68bc-message {\n    color: red;\n  }\n}'
    ].join('\n\n'));
  });

  it('should skip classes defined in options.except', function() {
    var classes = cssuniq('.message .icon { color: red; }', {
      expect: ['icon']
    });

    expect(classes.getStyle()).toEqual('.3c49c603-message .icon {\n  color: red;\n}');
  });

  it('should make classes unique matched by options.only', function() {
    var classes = cssuniq('.u1 .u2 .a1 { color: red; }', {
      only: /^u/
    });

    expect(classes.getStyle()).toEqual('.39f3871f-u1 .39f3871f-u2 .a1 {\n  color: red;\n}');
  });
});