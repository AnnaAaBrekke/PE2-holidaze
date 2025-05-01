import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showSuccess } from "../../utils/notifications";
import SkeletonLoader from "../SkeletonLoader";
import { Input, Checkbox } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import "../../styles/form.css";
import "../../styles/button.css";
import SubmitFormButton from "../buttons/submitFormButton";

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
      <h2 className="text-2xl font-bold">Register</h2>

      {/* Venue Manager Checkbox */}
      <div className="flex items-center">
        <Checkbox
          id="venueManager"
          {...register("venueManager")}
          className="size-4"
        />
        <label htmlFor="venueManager" className="label-style">
          Register as Venue Manager
        </label>
      </div>

      {/* Username */}
      <div>
        <label htmlFor="name" className="label-style">
          Username*
        </label>
        <Input
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
          error={!!errors.name}
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-style">
          Email*
        </label>
        <Input
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
          error={!!errors.email}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="label-style">
          Password*
        </label>
        <Input
          id="password"
          className="input-style"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={!!errors.password}
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}
      </div>

      {/* Repeat Password */}
      <div>
        <label htmlFor="password_repeat" className="block mb-1 font-medium">
          Repeat Password*
        </label>
        <Input
          id="password_repeat"
          className="input-style"
          type="password"
          {...register("password_repeat", {
            validate: (value) =>
              value === password || "Passwords do not match.",
          })}
          error={!!errors.password_repeat}
        />
        {errors.password_repeat && (
          <p className="error-text">{errors.password_repeat.message}</p>
        )}
      </div>

      <SubmitFormButton loading={loading} loadingText="Registering...">
        Register
      </SubmitFormButton>

      {/* Error display */}
      {error && <p className="error-text">{error}</p>}

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-color-secondary hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
