const assert = require("assert");
/**
 *
 *  OperationNode Class Serve as a parent class to implement a polymorphism principal
 *  This class also implement a builder pattern to allow an easy creation of tree and avoid null arguments
 */
abstract class OperatorNode {
  protected _value: number | null = null;
  protected _left: OperatorNode | null = null;
  protected _right: OperatorNode | null = null;

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
  public get value(): number | null {
    return this._value;
  }

  public get right(): OperatorNode | null {
    return this._right;
  }
  public get left(): OperatorNode | null {
    return this._left;
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

class PlusNode extends OperatorNode {
  result(): number {
    return this.left?.value! + this.right?.result()! || 0;
  }
  toString(): string {
    return `(${this.left?.toString()} + ${this.right?.toString()})`;
  }
}

class MinusNode extends OperatorNode {
  result(): number {
    return this.left?.result()! - this.right?.result()! || 0;
  }
  toString(): string {
    return `(${this.left?.toString()} - ${this.right?.toString()})`;
  }
}

class MultiplyNode extends OperatorNode {
  result(): number {
    return this.left?.result()! * this.right?.result()! || 0;
  }
  toString(): string {
    return `(${this.left?.toString()} x ${this.right?.toString()})`;
  }
}
class DividNode extends OperatorNode {
  result(): number {
    return this.left?.result()! / this.right?.result()! || 0;
  }
  toString(): string {
    return `(${this.left?.toString()} ÷ ${this.right?.toString()})`;
  }
}

const tree: OperatorNode = new DividNode()
  .withLeft(
    new PlusNode()
      .withLeft(new DefaultNode().withValue(7))
      .withRight(
        new MultiplyNode()
          .withLeft(
            new MinusNode()
              .withLeft(new DefaultNode().withValue(3))
              .withRight(new DefaultNode().withValue(2))
          )
          .withRight(new DefaultNode().withValue(5))
      )
  )
  .withRight(new DefaultNode().withValue(6));

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());
