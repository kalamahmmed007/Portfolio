import * as Yup from "yup";

export const projectSchema = Yup.object().shape({
  title: Yup.string()
    .required("Project title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  techStack: Yup.string()
    .required("Tech stack is required")
    .matches(/^[\w\s,.-]+$/, "Invalid characters in tech stack"),
  link: Yup.string()
    .url("Must be a valid URL")
    .nullable(),
});
