/**
 * RegisterForm - A user registration form with validation and role selection.
 *
 * @component
 * @returns {JSX.Element} A styled form that allows users to register as a customer or venue manager.
 *
 * Features:
 * - Uses `react-hook-form` for form state and validation
 * - Allows users to optionally register as a Venue Manager
 * - Validates:
 *   - Username (alphanumeric + underscores)
 *   - Email (must be a `stud.noroff.no` address)
 *   - Password (minimum 8 characters)
 *   - Password confirmation (must match)
 * - Displays validation errors and handles async registration via `useAuth`
 * - Shows success message on registration and redirects to login
 */

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SubmitFormButton from "../buttons/SubmitFormButton";
import { showSuccess } from "../../utils/notifications";
import SkeletonLoader from "../common/SkeletonLoader";
import "../../styles/form.css";
import "../../styles/button.css";

const RegisterForm = () => {
  const { register: registerUser, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");
  const CheckedOfVenueManager = watch("venueManager");

  const onSubmitForm = async (formData) => {
    const result = await registerUser(formData);
    if (result) {
      await showSuccess(
        `Registered successfully as a: ${formData.venueManager ? "Venue Manager" : "Customer"}`,
      );
      reset();
      navigate("/login");
    }
  };

  if (loading) {
    return <SkeletonLoader type="register" />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      noValidate
      className="form-style"
    >
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {/* Venue Manager Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="venueManager"
          className="mr-2 cursor-pointer"
          {...register("venueManager")}
        />
        <label htmlFor="venueManager" className="label-style">
          Register as Venue Manager
        </label>
      </div>

      {CheckedOfVenueManager && (
        <p className="body-3 mb-4">
          As a Venue Manager, you can create and manage your own venues. Show
          upcoming bookings and access extra dashboard tools.
        </p>
      )}

      {/* Username */}
      <div>
        <label htmlFor="name" className="label-style">
          Username*
        </label>
        <input
          id="name"
          className="input-style"
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message:
                "Username must not contain punctuation except underscores.",
            },
          })}
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-style">
          Email*
        </label>
        <input
          id="email"
          className="input-style"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
              message: "Email must be a valid stud.noroff.no address.",
            },
          })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>

      {/* Password */}
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

      {/* Repeat Password */}
      <div>
        <label htmlFor="password_repeat" className="label-style">
          Repeat Password*
        </label>
        <input
          id="password_repeat"
          type="password"
          className="input-style"
          {...register("password_repeat", {
            validate: (value) =>
              value === password || "Passwords do not match.",
          })}
        />
        {errors.password_repeat && (
          <p className="error-text">{errors.password_repeat.message}</p>
        )}
      </div>

      <SubmitFormButton loading={loading} loadingText="Registering...">
        Register
      </SubmitFormButton>

      {error && <p className="error-text">{error}</p>}

      <p className="mt-4 body-3 text-center">
        Already have an account?
        <Link
          to="/login"
          className="text-color-secondary underline ml-1 hover:text-color-accent-hover"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
