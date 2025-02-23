// 1. src/types/ruleTypes.ts
export interface ConditionType {
    id: string;
    name: string;
    metric: string;
    operator: string;
    value: string;
    subConditions?: ConditionType[];
    type: "and" | "or" | "all";
  }
  
  export interface StepType {
    id: string;
    name: string;
    conditions: ConditionType[];
    type: "and" | "or" | "all";
    on_success?: { action: string; text: string }[];
  }
  
  export interface RuleType {
    id: string;
    name: string;
    steps: StepType[];
    type: "and" | "or" | "all";
  }