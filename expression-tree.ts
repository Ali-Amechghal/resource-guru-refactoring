const assert = require("assert");

abstract class OperatorNode {
  protected _value: number;
  protected _left: OperatorNode;
  protected _right: OperatorNode;

  withValue(value: number): OperatorNode {
    this._value = value;
    return this;
  }

  withLeft(left: OperatorNode): OperatorNode {
    this._left = left;
    return this;
  }
  withRight(right: OperatorNode): OperatorNode {
    this._right = right;
    return this;
  }
  public get value(): number {
    return this.value;
  }

  public get right(): OperatorNode {
    return this.right;
  }
  public get left(): OperatorNode {
    return this.left;
  }

  abstract result(): number;
  abstract toString(): string;
}

class DefaultNode extends OperatorNode {
  result(): number {
    return this.value || 0;
  }
  toString(): string {
    return this.value?.toString() || "";
  }
}

const tree = new DefaultNode();

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());
