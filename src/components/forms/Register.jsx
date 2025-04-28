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
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <Input
        label="Username*"
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
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Input
        label="Email*"
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
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Input
        label="Password*"
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
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Input
        label="Repeat Password*"
        type="password"
        {...register("password_repeat", {
          validate: (value) => value === password || "Passwords do not match.",
        })}
        error={!!errors.password_repeat}
      />
      {errors.password_repeat && (
        <p className="text-red-500">{errors.password_repeat.message}</p>
      )}

      <Checkbox
        label="Register as Venue Manager"
        {...register("venueManager")}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
