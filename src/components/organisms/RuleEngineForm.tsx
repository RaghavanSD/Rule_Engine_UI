/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors } from "react-hook-form";
import { logicalOptions } from "../../const/options";
import { logicalOptionsType } from "../../types/common";
// import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import RuleTypeField from "../molecules/RuleField";
import styles from "./RuleEngine.module.css";
import { ruleSchemaType } from "./RuleEngine.schema";

interface RuleFormProps {
  errors: FieldErrors<ruleSchemaType>;
  onSubmit: any;
  ruleTypes: string[];
  register: any;
  control: any;
  deleteRuleType: any;
  addRuleType: any;
}
const RuleForm: React.FC<RuleFormProps> = ({
  errors,
  onSubmit,
  ruleTypes,
  register,
  control,
  deleteRuleType,
  addRuleType,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label>ID:</label>
        <Input {...register("id")} className={styles.input} disabled />
      </div>

      <div className={styles.formGroup}>
        <label>Name:</label>
        <Input {...register("name")} className={styles.input} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div>
        <h3 className={styles.subtitle}>Rules</h3>
        {ruleTypes.map((type, index) => (
          <RuleTypeField
            key={index}
            type={type}
            control={control}
            register={register}
            errors={errors}
            deleteRuleType={deleteRuleType}
          />
        ))}
        <div className={styles.formGroup}>
          <Select
            onChange={(e) => addRuleType(e.target.value as logicalOptionsType)}
            options={logicalOptions as unknown as string[]}
            className={styles.select}
            placeholder="Select Rule Type"
          />
        </div>
      </div>

      {/* <Button type="submit" className={styles.button}>
        Generate JSON
      </Button> */}
    </form>
  );
};

export default RuleForm;
