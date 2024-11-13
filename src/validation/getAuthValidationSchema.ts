import * as Yup from "yup";

interface AuthValidationProps {
  haveAccount: boolean;
}

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

const getAuthValidationSchema = (
  props: AuthValidationProps
): Yup.ObjectSchema<AuthFormData> => {
  return Yup.object().shape({
    name: Yup.string().when([], () => {
      return props.haveAccount
        ? Yup.string().trim()
        : Yup.string().trim().required("Full name is required");
    }),
    email: Yup.string()
      .required("Email is required")
      .trim()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Invalid email address"
      ),
    password: Yup.string()
      .required("Password is required")
      .trim()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-z]/, "Password must include a lowercase letter.")
      .matches(/[A-Z]/, "Password must include an uppercase letter.")
      .matches(/[0-9]/, "Password must include a number.")
      .matches(/[\W_]+/, "Password must include a special character.")
      .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
          "Password must include uppercase, lowercase, number, and symbol.",
      }),
  });
};

export default getAuthValidationSchema;
