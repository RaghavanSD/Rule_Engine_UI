/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray } from "react-hook-form";
import { logicalOptionsType } from "../../types/common";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import StepField from "./StepForm";
import styles from "../molecules/StepForm.module.css";
const RuleTypeField: React.FC<{
  type: string;
  control: any;
  register: any;
  errors: any;
  deleteRuleType: (type: logicalOptionsType) => void;
}> = ({ type, control, register, errors, deleteRuleType }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `rules.${type}` as const,
  });

  return (
    <div className={styles.formGroup}>
      <h4>{type} Rules</h4>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className={styles.ruleRow}>
            <Input
              {...register(`rules.${type}.${index}.name` as const)}
              className={styles.input}
              placeholder="Rule Name"
            />
            {errors.rules?.[type]?.[index]?.name && (
              <p className={styles.error}>
                {errors.rules[type][index].name.message}
              </p>
            )}
            <Button
              type="button"
              onClick={() => remove(index)}
              className={styles.deleteButton}
            >
              ×
            </Button>
          </div>
          <StepField
            type={type}
            ruleIndex={index}
            control={control}
            register={register}
            errors={errors}
          />
        </div>
      ))}
      <div className={styles.buttonRow}>
        <Button
          type="button"
          onClick={() => append({ name: "" })}
          className={styles.button}
        >
          + Add Rule to {type}
        </Button>
        <Button
          type="button"
          onClick={() => deleteRuleType(type as logicalOptionsType)}
          className={styles.deleteButton}
        >
         - Delete {type} Rules
        </Button>
      </div>
    </div>
  );
};

export default RuleTypeField;
