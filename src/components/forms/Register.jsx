import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showSuccess } from "../../utils/notifications";
import SkeletonLoader from "../SkeletonLoader";
import { Input, Checkbox } from "@material-tailwind/react";

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
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {/* Username */}
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Username*
        </label>
        <Input
          id="name"
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
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email*
        </label>
        <Input
          id="email"
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
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password*
        </label>
        <Input
          id="password"
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
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Repeat Password */}
      <div>
        <label htmlFor="password_repeat" className="block mb-1 font-medium">
          Repeat Password*
        </label>
        <Input
          id="password_repeat"
          type="password"
          {...register("password_repeat", {
            validate: (value) =>
              value === password || "Passwords do not match.",
          })}
          error={!!errors.password_repeat}
        />
        {errors.password_repeat && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password_repeat.message}
          </p>
        )}
      </div>

      {/* Venue Manager Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox id="venueManager" {...register("venueManager")} />
        <label htmlFor="venueManager" className="text-sm font-medium">
          Register as Venue Manager
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {/* Error display */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
