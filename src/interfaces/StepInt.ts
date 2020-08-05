export interface StepInt {
  changeType: string;
  oldEquation: Equation;
  newEquation: Equation;
}

interface Equation {
  leftNode: Node;
  rightNode: Node;
  comparator: string;
  ascii(): string;
}

interface Node {
  implicit?: boolean;
  op?: string;
  fn?: string;
  args?: Array<unknown>;
  changeGroup: number | undefined;
  name?: string;
  value?: string;
  valueType?: string;
}
