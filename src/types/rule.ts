import { RuleType } from "./ruleEngine";

export type RuleProps = {
  rule: RuleType;
  setRules: React.Dispatch<React.SetStateAction<RuleType[]>>;
  rules: RuleType[];
};