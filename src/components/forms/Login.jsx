// Import UseForm from React-hook-form
// Create the form layout
// Form fields required with regEx- pattern - validation
// HandleSubmit Form onSubmit
// UseAuth AuthProvider
// reset, loading, error
// Navigate

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register, // tells inputs to register with the form
    handleSubmit, // runs your function when the form is submitted,
    formState: { errors }, // holds validation errors,
  } = useForm();

  const onSubmitForm = async (formData) => {
    const result = await login(formData);
    if (result) {
      alert(
        `Logged in successfully as a ${result.data.venueManager ? "Venue Manager" : "Customer"}!`,
      );
      if (result.data?.venueManager) {
        navigate("/manager");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
      <h2>Login</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
            message: "The email must be a valid stud.noroff.no address.",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        autoComplete="new-password"
        aria-invalid={errors.password ? "true" : "false"}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
};

export default LoginForm;
