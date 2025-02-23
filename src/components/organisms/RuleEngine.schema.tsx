import { z } from "zod";
import { logicalOptions } from "../../const/options"; // Ensure it's a readonly tuple like ["AND", "OR", "ALL"] as const

const actionSchema = z.object({
  action: z.string().min(1),
  text: z.string().min(1),
});

const conditionSchema = z.object({
  and: z.array(
    z.object({
      metric: z.string().min(1),
      operator: z.string().min(1),
      value: z.union([z.string(), z.number()]), // Can be a number (10,000) or string ("PREMIUM")
    })
  ),
  type: z.literal("and"), // Matches given JSON
});

const stepSchema = z.object({
  name: z.string().min(1, "Step name is required"),
  on_success: z.array(actionSchema),
  conditions: conditionSchema,
});

// Dynamically allows ANY rule type (AND, OR, ALL) as key
const stepsSchema = z.record(z.enum(logicalOptions), z.array(stepSchema)).optional();//remove optional

const ruleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  rules: z.record(
    z.enum(logicalOptions), // Allows dynamic rule types (AND, OR, ALL)
    z.array(
      z.object({
        name: z.string().min(1, "Rule name is required"),
        steps: stepsSchema, // Dynamic steps with OR, AND, or ALL keys
      })
    )
  ),
});

export type ruleSchemaType = z.infer<typeof ruleSchema>;
export default ruleSchema;
