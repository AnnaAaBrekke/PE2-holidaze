import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { createVenue, updateVenue } from "../../services/VenueService";
import { confirmAction, showSuccess } from "../../utils/notifications";
import { useEffect, useState } from "react";
import { Input, Checkbox } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import "../../styles/form.css";

const VenueForm = ({ mode = "create", venue = {}, venueId, onVenueSaved }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const mediaUrls = watch(["mediaUrl1", "mediaUrl2", "mediaUrl3", "mediaUrl4"]);
  const previewImages = mediaUrls.filter((url) => url);

  useEffect(() => {
    if (mode === "edit" && venue) {
      reset({
        name: venue.name || "",
        description: venue.description || "",
        rating: venue.rating || 0,
        price: venue.price || "",
        maxGuests: venue.maxGuests || "",
        mediaUrl1: venue.media?.[0]?.url || "",
        mediaUrl2: venue.media?.[1]?.url || "",
        mediaUrl3: venue.media?.[2]?.url || "",
        mediaUrl4: venue.media?.[3]?.url || "",
        city: venue.location?.city || "",
        country: venue.location?.country || "",
        meta: {
          wifi: venue.meta?.wifi || false,
          parking: venue.meta?.parking || false,
          breakfast: venue.meta?.breakfast || false,
          pets: venue.meta?.pets || false,
        },
      });
    }
  }, [mode, venue, reset]);

  const onSubmitVenueForm = async (formData) => {
    const confirmed = await confirmAction(
      `This will ${mode === "edit" ? "update" : "create"} the venue. Do you want to continue?`,
    );
    if (!confirmed) return;

    const venueFormData = {
      name: formData.name,
      description: formData.description,
      rating: Number(formData.rating) || 0,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      media: [
        formData.mediaUrl1,
        formData.mediaUrl2,
        formData.mediaUrl3,
        formData.mediaUrl4,
      ]
        .filter((url) => url)
        .map((url) => ({ url, alt: formData.name })),
      location: {
        city: formData.city,
        country: formData.country,
      },
      meta: {
        wifi: formData.meta?.wifi || false,
        parking: formData.meta?.parking || false,
        breakfast: formData.meta?.breakfast || false,
        pets: formData.meta?.pets || false,
      },
    };

    try {
      setLoading(true);
      const result =
        mode === "edit"
          ? await updateVenue(venueId, venueFormData, token)
          : await createVenue(venueFormData, token);

      onVenueSaved?.(result.data);
      await showSuccess(
        `Venue ${mode === "edit" ? "updated" : "created"} successfully`,
      );
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Edit Venue" : "Create Venue"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmitVenueForm)}
        className="form-style"
        noValidate
      >
        {/* Name */}
        <div>
          <label className="label-style">Name*</label>
          <Input
            className="input-style"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label-style">Description*</label>
          <textarea
            className="input-style"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="error-text">{errors.description.message}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="label-style">Rating (0-5)</label>
          <Input
            className="input-style"
            type="number"
            {...register("rating", {
              min: { value: 0, message: "Minimum rating is 0" },
              max: { value: 5, message: "Maximum rating is 5" },
            })}
          />
          {errors.rating && (
            <p className="error-text">{errors.rating.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="label-style">Price per night*</label>
          <Input
            className="input-style"
            type="number"
            {...register("price", { required: "Price is required", min: 0 })}
          />
          {errors.price && <p className="error-text">{errors.price.message}</p>}
        </div>

        {/* Max Guests */}
        <div>
          <label className="label-style">Max Guests*</label>
          <Input
            className="input-style"
            type="number"
            {...register("maxGuests", {
              required: "Max guests required",
              min: 1,
            })}
          />
          {errors.maxGuests && (
            <p className="error-text">{errors.maxGuests.message}</p>
          )}
        </div>

        {/* Image Previews */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {previewImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Preview ${idx + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Image URLs */}
        <div>
          <label className="label-style">Main Image URL*</label>
          <Input
            className="input-style"
            {...register("mediaUrl1", { required: "Main image URL required" })}
          />
        </div>
        <div>
          <label className="label-style">Image URL 2 (optional)</label>
          <Input className="input-style" {...register("mediaUrl2")} />
        </div>
        <div>
          <label className="label-style">Image URL 3 (optional)</label>
          <Input className="input-style" {...register("mediaUrl3")} />
        </div>
        <div>
          <label className="label-style">Image URL 4 (optional)</label>
          <Input className="input-style" {...register("mediaUrl4")} />
        </div>

        {/* City */}
        <div>
          <label className="label-style">City*</label>
          <Input
            className="input-style"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p className="error-text">{errors.city.message}</p>}
        </div>

        {/* Country */}
        <div>
          <label className="label-style">Country*</label>
          <Input
            className="input-style"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <p className="error-text">{errors.country.message}</p>
          )}
        </div>

        {/* Amenities */}
        <div className="grid grid-cols-2">
          <Checkbox label="Free Wifi" {...register("meta.wifi")} />
          <Checkbox label="Parking" {...register("meta.parking")} />
          <Checkbox label="Free Breakfast" {...register("meta.breakfast")} />
          <Checkbox label="Pets Allowed" {...register("meta.pets")} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#0F6474] text-[#E0F9F6] w-full font-medium text-lg px-6 py-2 rounded shadow-md hover:bg-[#0d5665] focus:outline-none"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader />
          ) : mode === "edit" ? (
            "Update Venue"
          ) : (
            "Create Venue"
          )}
        </button>
      </form>
    </div>
  );
};

export default VenueForm;
