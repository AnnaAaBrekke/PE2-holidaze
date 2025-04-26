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
import { showSuccess } from "../../utils/notifications";

const RegisterForm = () => {
  const { register: registerUser, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register, // tells inputs to register with the form
    handleSubmit, // runs your function when the form is submitted,
    watch,
    formState: { errors }, // holds validation errors,
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmitForm = async (formData) => {
    const result = await registerUser(formData);
    if (result) {
      await showSuccess(
        `Registered successfully as a ${formData.venueManager ? "Venue Manager" : "Customer"}`,
      );
      reset();
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
      <h2>Register</h2>

      <label htmlFor="name">Username</label>
      <input
        id="name"
        autoComplete="username"
        aria-invalid={errors.name ? "true" : "false"}
        {...register("name", {
          required: "Name is required",
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message:
              "The name must not contain punctuation except underscores.",
          },
        })}
      />
      {errors.name && <p>{errors.name.message}</p>}

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

      <label htmlFor="password_repeat">Repeat Password</label>
      <input
        id="password_repeat"
        type="password"
        autoComplete="new-password"
        aria-invalid={errors.password_repeat ? "true" : "false"}
        {...register("password_repeat", {
          validate: (value) =>
            value === password || "The password do not match.",
        })}
      />
      {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

      <label htmlFor="venueManagerBox">Register as Venue Manager</label>
      <input
        id="venueManagerBox"
        type="checkbox"
        {...register("venueManager")}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Already have a user? <Link to={"/login"}>Login here</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
