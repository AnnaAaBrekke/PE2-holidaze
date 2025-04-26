import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import updateProfile from "../../services/ProfileService";
import { useState } from "react";
import { showAlert, showSuccess } from "../../utils/notifications";

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
      url: user?.avatar?.url || "",
      alt: user?.avatar?.alt || "",
      bio: user?.bio || "",
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
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {/* Avatar Preview*/}

      <div className="flex gap-4 mt-4 items-center">
        <div>
          <p className="text-sm">Current Avatar</p>
          <img
            src={user?.avatar?.url || "https://placehold.co/150"}
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
        <label>Avatar URL</label>
        <input {...register("url", { required: "URL is required" })} />
        {errors.url && <p>{errors.url.message}</p>}
      </div>

      <div>
        <label>Avatar Alt</label>
        <input {...register("alt", { required: "Alt is required" })} />
        {errors.alt && <p>{errors.alt.message}</p>}
      </div>

      <div>
        <label>Bio</label>
        <textarea {...register("bio", { maxLength: 200 })} />
        {errors.bio && <p>{errors.bio.message}</p>}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default EditProfileForm;
