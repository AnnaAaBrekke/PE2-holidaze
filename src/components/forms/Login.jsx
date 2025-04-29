import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showSuccess } from "../../utils/notifications";
import SkeletonLoader from "../SkeletonLoader";
import { Input } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
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
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <div>
        <label htmlFor="email" className="label.style">
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
        {errors.email && (
          <p className="error-tex">{errors.email.message}</p>
        )}
      </div>

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

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? (
          <>
            <ClipLoader size={20} color="#ffffff" />
            <span className="ml-2">Logging in...</span>
          </>
        ) : (
          "Login"
        )}
      </button>

      {error && <p className="error-text">{error}</p>}

      <p className="mt-2 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
