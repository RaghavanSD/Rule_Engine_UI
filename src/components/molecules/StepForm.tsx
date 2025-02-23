/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./StepForm.module.css";
import Select from "../atoms/Select";
import { logicalOptions } from "../../const/options";
import { logicalOptionsType } from "../../types/common";
import { useState } from "react";
import StepTypeField from "./StepTypeField";

const StepField: React.FC<{
  type: string;
  control: any;
  register: any;
  errors: any;
  ruleIndex: number;
}> = ({ type, control, register, errors, ruleIndex }) => {
  const [stepTypes, setStepTypes] = useState<logicalOptionsType[]>([]);

  const addStepType = (selectedType: logicalOptionsType) => {
    if (!stepTypes.includes(selectedType)) {
      setStepTypes((prev) => [...prev, selectedType]);
    }
  };

  return (
    <div className={styles.stepGroup}>
      <h5>Steps</h5>

      {/* Step Type Selector */}
      <div className={styles.formGroup}>
        <Select
          onChange={(e) => addStepType(e.target.value as logicalOptionsType)}
          options={logicalOptions as unknown as string[]}
          className={styles.select}
          placeholder="Select Step Type"
        />
      </div>

      {/* Render Steps for Each Step Type */}
      {stepTypes.map((stepType) => (
        <StepTypeField
          key={stepType}
          type={type}
          stepType={stepType}
          control={control}
          register={register}
          errors={errors}
          ruleIndex={ruleIndex}
        />
      ))}
    </div>
  );
};

// const StepTypeField: React.FC<{
//   type: string;
//   stepType: logicalOptionsType;
//   control: any;
//   register: any;
//   errors: any;
//   ruleIndex: number;
// }> = ({ type, stepType, control, register, ruleIndex }) => {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: `rules.${type}.${ruleIndex}.steps.${stepType}` as const,
//   });

//   return (
//     <div>
//       <h6>{stepType} Steps</h6>
//       {fields.map((field, index) => (
//         <div key={field.id} className={styles.stepRow}>
//           {/* Step Name */}
//           <Input
//             {...register(
//               `rules.${type}.${ruleIndex}.steps.${stepType}.${index}.name` as const
//             )}
//             className={styles.input}
//             placeholder="Step Name"
//           />

//           {/* Conditions */}
//           <div className={styles.conditionGroup}>
//             <label>Conditions</label>
//             <Input
//               {...register(
//                 `rules.${type}.${ruleIndex}.steps.${stepType}.${index}.conditions.type` as const
//               )}
//               className={styles.input}
//               placeholder="Condition Type"
//             />
//           </div>

//           {/* On Success Actions */}
//           <div className={styles.onSuccessGroup}>
//             <label>On Success Actions</label>
//             <Input
//               {...register(
//                 `rules.${type}.${ruleIndex}.steps.${stepType}.${index}.on_success.0.action` as const
//               )}
//               className={styles.input}
//               placeholder="Action"
//             />
//             <Input
//               {...register(
//                 `rules.${type}.${ruleIndex}.steps.${stepType}.${index}.on_success.0.text` as const
//               )}
//               className={styles.input}
//               placeholder="Text"
//             />
//           </div>

//           {/* Remove Step Button */}
//           <Button
//             type="button"
//             onClick={() => remove(index)}
//             className={styles.deleteButton}
//           >
//             ×
//           </Button>
//         </div>
//       ))}

//       {/* Add Step Button for Each Type */}
//       <Button
//         type="button"
//         onClick={() =>
//           append({
//             name: "",
//             on_success: [],
//             conditions: { type: stepType, and: [] },
//           })
//         }
//         className={styles.button}
//       >
//         + Add {stepType} Step
//       </Button>
//     </div>
//   );
// };

export default StepField;
