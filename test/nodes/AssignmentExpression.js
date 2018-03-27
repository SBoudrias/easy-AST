/*globals describe, it, beforeEach */
var assert = require('assert');

var AssignmentExpression = require('../../lib/nodes/AssignmentExpression.js');

var Tree = require('../..');

[
  Tree.fromSource,
  function() {
    var tree = Tree.fromSource(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    return Tree.fromTree(tree.tree, arguments[1], arguments[2], arguments[3], arguments[4]);
  },
].forEach(function(program) {
  describe('AssignmentExpression objects', function () {
    beforeEach(function () {
      this.tree1 = program('a = 1;');
      this.tree2 = program('module.export = 2;');
      this.tree3 = program('some.deeply.nested.property = 3;');
    });

    it('selects assignment expression', function () {
      assert.equal(this.tree1.assignment('a').length, 1);
    });

    it('selects member assignment expression', function () {
      assert.equal(this.tree2.assignment('module.export').length, 1);
    });

    it('selects member assignment from regex', function () {
      assert.equal(this.tree2.assignment(/module/).length, 1);
    });

    it('selects multi-member assignment from regex', function () {
      assert.equal(this.tree3.assignment(/some\.[a-z]+\.[a-z]+/).length, 1);
    });

    describe('#value()', function () {
      it('return the wrapped value', function () {
        var val = this.tree1.assignment('a').value();
        assert.equal(val.type, 'Literal');
        assert.equal(val.value(), 1);
      });
    });
  });
});
