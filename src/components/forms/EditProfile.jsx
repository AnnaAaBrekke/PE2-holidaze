/**
 * EditProfileForm - A form that allows the user to update their avatar and bio.
 *
 * @component
 * @param {Object} props
 * @param {Function} [props.onClose] - Optional callback to close the form after a successful update.
 * @returns {JSX.Element} A profile edit form with avatar preview, validation, and loading state.
 *
 * Features:
 * - Uses `react-hook-form` for form state and validation
 * - Pre-fills form with current user data from `useAuth`
 * - Live preview of new avatar image
 * - Validates avatar URL, alt text, and bio (max 200 characters)
 * - Sends update to API and updates global user state on success
 * - Shows errors and confirmation messages using alert utilities
 */

import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import updateProfile from "../../services/ProfileService";
import { useState } from "react";
import SubmitFormButton from "../buttons/SubmitFormButton";
import { showAlert, showSuccess } from "../../utils/notifications";
import "../../styles/form.css";
import "../../styles/button.css";

const EditProfileForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token, user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url:
        user?.avatar?.url ||
        "https://plus.unsplash.com/premium_photo-1682308170035-ec5ef069ee10?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGF2YXRhciUyMGZha2V8ZW58MHx8MHx8fDA%3D",
      alt: user?.avatar?.alt || "Avatar",
      bio: user?.bio || "Bio",
    },
  });

  const newAvatarImg = watch("url");

  const onSubmitForm = async (formData) => {
    setLoading(true);

    try {
      const result = await updateProfile({
        name: user.name,
        token,
        ...formData,
      });

      const updatedUser = {
        ...user,
        avatar: result.data.avatar,
        bio: result.data.bio,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      await showSuccess("Updated profile");
      onClose?.();
    } catch (error) {
      setError(error.message);
      await showAlert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="form-style">
      {/* Avatar Preview */}
      <div className="flex gap-4 mt-4 justify-center">
        <div>
          <p className="body-3">Current Avatar</p>
          <img
            src={
              user?.avatar?.url ||
              "https://plus.unsplash.com/premium_photo-1682308170035-ec5ef069ee10?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGF2YXRhciUyMGZha2V8ZW58MHx8MHx8fDA%3D"
            }
            alt="Current avatar"
            className="h-24 w-24 rounded-full border"
          />
        </div>

        <div>
          <p className="body-3">New Avatar Preview</p>
          <img
            src={newAvatarImg || "https://placehold.co/150?text=Preview"}
            alt="New avatar preview"
            className="h-24 w-24 rounded-full border"
          />
        </div>
      </div>

      {/* Avatar URL */}
      <div>
        <label htmlFor="url" className="label-style">
          Avatar URL
        </label>
        <input
          id="url"
          className="input-style"
          {...register("url", { required: "URL is required" })}
        />
        {errors.url && <p className="error-text">{errors.url.message}</p>}
      </div>

      {/* Avatar Alt */}
      <div>
        <label htmlFor="alt" className="label-style">
          Avatar Alt
        </label>
        <input
          id="alt"
          className="input-style"
          {...register("alt", { required: "Alt is required" })}
        />
        {errors.alt && <p className="error-text">{errors.alt.message}</p>}
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="label-style">
          Bio
        </label>
        <textarea
          id="bio"
          className="input-style"
          {...register("bio", { maxLength: 200 })}
        />
        {errors.bio && <p className="error-text">{errors.bio.message}</p>}
      </div>

      {/* General error */}
      {error && <p className="error-text">{error}</p>}

      {/* Submit button */}
      <SubmitFormButton loading={loading} loadingText="Updating...">
        Update Profile
      </SubmitFormButton>
    </form>
  );
};

export default EditProfileForm;
