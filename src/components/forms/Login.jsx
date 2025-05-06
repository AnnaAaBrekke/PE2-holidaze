/**
 * LoginForm - A user login form with validation and redirect based on user role.
 *
 * @component
 * @returns {JSX.Element} A styled login form for authenticating users.
 *
 * Features:
 * - Uses `react-hook-form` for form handling and validation
 * - Validates:
 *   - Email (must be a `stud.noroff.no` address)
 *   - Password (minimum 8 characters)
 * - Displays inline validation errors
 * - Handles async login through `useAuth`
 * - Shows loading spinner via `SkeletonLoader` while authenticating
 * - Redirects:
 *   - Venue Managers to `/manager`
 *   - Customers to homepage `/`
 * - Shows a link to the registration form
 */

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SubmitFormButton from "../buttons/SubmitFormButton";
import { showSuccess } from "../../utils/notifications";
import SkeletonLoader from "../SkeletonLoader";
import "../../styles/form.css";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = async (formData) => {
    const result = await login(formData);
    if (result) {
      await showSuccess(
        `Logged in successfully as a: ${result.data.venueManager ? "Venue Manager" : "Customer"}`,
      );
      navigate(result.data.venueManager ? "/manager" : "/");
    }
  };

  if (loading) {
    return <SkeletonLoader type="login" />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      noValidate
      className="form-style"
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <div>
        <label htmlFor="email" className="label-style">
          Email*
        </label>
        <input
          id="email"
          type="email"
          className="input-style"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
              message: "Email must be a valid stud.noroff.no address.",
            },
          })}
        />
        {errors.email && <p className="error-tex">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="label-style">
          Password*
        </label>
        <input
          id="password"
          type="password"
          className="input-style"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}
      </div>

      <SubmitFormButton loading={loading} loadingText="Logging in...">
        Login
      </SubmitFormButton>

      {error && <p className="error-text">{error}</p>}

      <p className="mt-2 text-center">
        Don't have an account?
        <Link
          to="/register"
          className="text-color-secondary underline ml-1  hover:text-color-accent-hover"
        >
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
