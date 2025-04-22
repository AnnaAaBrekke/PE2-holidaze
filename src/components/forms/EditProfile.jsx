import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import updateProfile from "../../services/ProfileService";
import { useState } from "react";

const EditProfileForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token, user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: user?.avatar?.url || "",
      alt: user?.avatar?.alt || "",
      bio: user?.bio || "",
    },
  });

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
      onClose?.();
      alert("Profile Updated");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <label>Avatar URL</label>
        <input {...register("url", { required: "URL is required" })} />
        {errors.url && <p>{errors.url.message}</p>}
      </div>

      <div>
        <label>Alt Text</label>
        <input {...register("alt")} />
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
