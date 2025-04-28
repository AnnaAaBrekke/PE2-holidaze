import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showSuccess } from "../../utils/notifications";
import SkeletonLoader from "../SkeletonLoader";
import { Input } from "@material-tailwind/react";

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
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

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

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
