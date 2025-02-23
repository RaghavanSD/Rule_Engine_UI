/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import styles from "./StepForm.module.css";
import ConditionBuilder from "./ConditionField";

interface StepTypeFieldProps {
  type: string;
  stepType: string;
  control: Control<any>;
  register: UseFormRegister<any>;
  ruleIndex: number;
  errors: any;
}

const StepTypeField: React.FC<StepTypeFieldProps> = ({
  type,
  stepType,
  control,
  register,
  ruleIndex,
}) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `rules.${type}.${ruleIndex}.steps.${stepType}`,
  });

  const actionOptions = ["on_success", "on_failure"];
  const [selectedActions, setSelectedActions] = useState<
    Record<number, string[]>
  >({});

  const handleAddActionType = (index: number) => {
    setSelectedActions((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), ""],
    }));
  };

  const handleActionChange = (
    index: number,
    actionIndex: number,
    newAction: string
  ) => {
    setSelectedActions((prev) => {
      const updatedActions = [...(prev[index] || [])];
      updatedActions[actionIndex] = newAction;
      return { ...prev, [index]: updatedActions };
    });

    const field = fields[index] as Record<string, any>;
    if (!field) return;

    const { id, ...rest } = field;
    const existingActions = Object.keys(rest).filter((key) =>
      actionOptions.includes(key)
    );

    const oldActionKey = existingActions[actionIndex];
    if (oldActionKey === newAction) return;

    const { [oldActionKey]: oldValue, ...updatedFields } = rest;
    update(index, {
      ...updatedFields,
      [newAction]: oldValue || [{ action: "", text: "" }],
    });
  };

  return (
    <div>
      <h6>{stepType} Steps</h6>
      {fields.map((field, index) => {
        const { id, ...fieldData } = field; // Remove id before updating
        return (
          <div key={field.id} className={styles.stepRow}>
            <Input
              {...register(
                `rules.${type}.${ruleIndex}.steps.${stepType}.${index}.name`
              )}
              className={styles.input}
              placeholder="Step Name"
            />

            <div className={styles.actionGroup}>
              <Button type="button" onClick={() => handleAddActionType(index)}>
                + Add Action Type
              </Button>
            </div>

            {selectedActions[index]?.map((action, actionIndex) => (
              <div key={actionIndex} className={styles.actionSection}>
                <label>Action Type</label>
                <Select
                  value={action}
                  onChange={(e) =>
                    handleActionChange(index, actionIndex, e.target.value)
                  }
                  className={styles.select}
                  options={actionOptions}
                  placeholder="Select event"
                />

                {action && (
                  <div className={styles.actionFields}>
                    {(fields[index] as any)?.[action]?.map(
                      (_: any, subIndex: number) => (
                        <div key={subIndex} className={styles.actionRow}>
                          <Input
                            {...register(
                              `rules.${type}.${ruleIndex}.steps.${stepType}.${index}.${action}.${subIndex}.action`
                            )}
                            className={styles.input}
                            placeholder="Action"
                          />
                          <Input
                            {...register(
                              `rules.${type}.${ruleIndex}.steps.${stepType}.${index}.${action}.${subIndex}.text`
                            )}
                            className={styles.input}
                            placeholder="Text"
                          />
                        </div>
                      )
                    )}
                    <Button
                      type="button"
                      onClick={() => {
                        update(index, {
                          ...fieldData,
                          [action]: [
                            ...((fields[index] as any)?.[action] || []),
                            { action: "", text: "" },
                          ],
                        });
                      }}
                      className={styles.addActionButton}
                    >
                      + Add {action.replace("_", " ")} Action
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        const updatedStep = { ...fieldData } as Record<
                          string,
                          any
                        >;
                        delete updatedStep[action]; // Remove the action key dynamically
                        update(index, updatedStep);
                      }}
                      className={styles.deleteButton}
                    >
                      Delete {action.replace("_", " ")} Action
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <ConditionBuilder
              control={control}
              register={register}
              name={`rules.${type}.${ruleIndex}.steps.${stepType}.${index}.conditions`}
            />

            <Button
              type="button"
              onClick={() => remove(index)}
              className={styles.deleteButton}
            >
              - Delete Step
            </Button>
          </div>
        );
      })}

      <div>
        <Button
          type="button"
          onClick={() =>
            append({
              name: "",
              conditions: {
                type: "and",
                and: [{ metric: "", operator: "", value: "" }],
              },
            })
          }
          className={styles.button}
        >
          + Add {stepType} Step
        </Button>
      </div>
    </div>
  );
};

export default StepTypeField;
