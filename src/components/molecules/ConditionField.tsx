/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useFieldArray,
  useWatch,
  Control,
  UseFormRegister,
} from "react-hook-form";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import styles from "./StepForm.module.css";
import {
  logicalOptions,
  metricOptions,
  operatorOptions,
} from "../../const/options";

interface ConditionBuilderProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
}

const ConditionBuilder: React.FC<ConditionBuilderProps> = ({
  control,
  register,
  name,
}) => {
  const selectedType = useWatch({ control, name: `${name}.type` }) || "and";

  const fieldName = `${name}.${selectedType}`;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName, //Dynamic name
  });

  const watchedConditions = useWatch({
    control,
    name: fieldName, //Dynamic watch path
  });

  return (
    <div className={styles.conditionContainer}>
      <label>Conditions</label>

      <div className={styles.conditionType}>
        <label>Condition Type:</label>
        <Select
          {...register(`${name}.type`)}
          className={styles.input}
          placeholder="Condition Type (and/or)"
          options={logicalOptions as unknown as string[]}
          value={selectedType}
        />
      </div>
      {fields.map((field, index) => {
        const selectedMetric = watchedConditions?.[index]?.metric || "";
        const selectedOperator = watchedConditions?.[index]?.operator || "";

        return (
          <div key={field.id} className={styles.conditionRow}>
            <Select
              className={styles.margin5}
              {...register(`${fieldName}.${index}.metric`)}
              value={selectedMetric}
              onChange={(e) =>
                register(`${fieldName}.${index}.metric`).onChange(e)
              }
              options={metricOptions}
              placeholder="Select Metric"
            />

            <Select
              className={styles.margin5}
              {...register(`${fieldName}.${index}.operator`)}
              value={selectedOperator}
              onChange={(e) =>
                register(`${fieldName}.${index}.operator`).onChange(e)
              }
              options={operatorOptions}
              placeholder="Select Operator"
            />

            <Input
              {...register(`${fieldName}.${index}.value`)}
              className={styles.input}
              placeholder="Enter Metric Value"
            />
            <div className={styles.buttonRow}>
              <Button
                type="button"
                onClick={() =>
                  append({
                    metric: "",
                    operator: "",
                    value: "",
                  })
                }
                className={styles.addButton}
              >
                + Add Condition
              </Button>
              <Button
                type="button"
                onClick={() => remove(index)}
                className={styles.deleteButton}
              >
                - Delete Condition
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConditionBuilder;
