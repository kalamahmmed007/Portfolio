import * as Yup from "yup";

export const skillSchema = Yup.object().shape({
  name: Yup.string()
    .required("Skill name is required")
    .min(2, "Skill name must be at least 2 characters"),
  level: Yup.number()
    .required("Skill level is required")
    .min(0, "Level must be at least 0%")
    .max(100, "Level cannot exceed 100%"),
  icon: Yup.string().nullable(),
});
