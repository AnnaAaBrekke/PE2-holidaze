import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import updateProfile from "../../services/ProfileService";
import { useState } from "react";
import { showAlert, showSuccess } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import "../../styles/form.css";
import "../../styles/button.css";
import SubmitFormButton from "../buttons/submitFormButton";

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
      {/* Avatar Preview*/}

      <div className="flex gap-4 mt-4 justify-center">
        <div>
          <p className="text-sm">Current Avatar</p>
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
          <p className="text-sm">New Avatar Preview</p>
          <img
            src={newAvatarImg || "https://placehold.co/150?text=Preview"}
            alt="New avatar preview"
            className="h-24 w-24 rounded-full border"
          />
        </div>
      </div>

      <div>
        <label className="label-style">Avatar URL</label>
        <input
          className="input-style"
          {...register("url", { required: "URL is required" })}
        />
        {errors.url && <p>{errors.url.message}</p>}
      </div>

      <div>
        <label className="label-style">Avatar Alt</label>
        <input
          className="input-style"
          {...register("alt", { required: "Alt is required" })}
        />
        {errors.alt && <p>{errors.alt.message}</p>}
      </div>

      <div>
        <label className="label-style">Bio</label>
        <textarea
          className="input-style"
          {...register("bio", { maxLength: 200 })}
        />
        {errors.bio && <p>{errors.bio.message}</p>}
      </div>

      {error && <p className="error-text">{error}</p>}

      <SubmitFormButton loading={loading} loadingText="Updating...">
        Update Profile
      </SubmitFormButton>
    </form>
  );
};

export default EditProfileForm;
