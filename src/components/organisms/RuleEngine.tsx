import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./RuleEngine.module.css";
import { logicalOptionsType } from "../../types/common";
import ruleSchema, { ruleSchemaType } from "./RuleEngine.schema";
import RuleEngineForm from "./RuleEngineForm";
import JsonViewer from "./JsonViewer";

const RuleForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ruleSchemaType>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      id: "0194f8cf-3caa-79cb-b0a6-69d715fd34e3",
      name: "Template Customer Discount Prediction",
      rules: {},
    },
  });

  const [ruleTypes, setRuleTypes] = useState<string[]>([]);

  const addRuleType = (type: logicalOptionsType) => {
    if (!ruleTypes.includes(type)) {
      setRuleTypes([...ruleTypes, type]);
    }
  };

  const deleteRuleType = (type: logicalOptionsType) => {
    const currentRules = getValues("rules");
    const updatedRules = { ...currentRules };
    delete updatedRules[type];
    setValue("rules", updatedRules);
    setRuleTypes((prev) => prev.filter((t) => t !== type));
  };

  const onSubmit = (data: ruleSchemaType) => {
    console.log("Generated JSON:", data);
    alert("JSON logged in console");
  };

  const liveJson = watch();
  console.log("errors", errors);
  return (
    <div className={styles.splitContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Rule Engine Configuration</h2>
        <RuleEngineForm
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          ruleTypes={ruleTypes}
          register={register}
          control={control}
          deleteRuleType={deleteRuleType}
          addRuleType={addRuleType}
        />
      </div>

      {/* Live JSON Preview */}
      <div className={styles.jsonContainer}>
        <h3>Live JSON Output</h3>
         <JsonViewer liveJson={liveJson}/>
      </div>
    </div>
  );
};

export default RuleForm;
