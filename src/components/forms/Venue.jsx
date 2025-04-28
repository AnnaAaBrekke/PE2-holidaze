import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { createVenue, updateVenue } from "../../services/VenueService";
import { confirmAction, showSuccess } from "../../utils/notifications";
import { useEffect, useState } from "react";
import { Input, Checkbox } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Edit Venue" : "Create Venue"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmitVenueForm)}
        className="space-y-6"
        noValidate
      >
        {/* Name */}
        <div>
          <label>Name*</label>
          <Input {...register("name", { required: "Name is required" })} />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label>Description*</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="border p-2 w-full rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label>Rating (0-5)</label>
          <Input
            type="number"
            {...register("rating", {
              min: { value: 0, message: "Minimum rating is 0" },
              max: { value: 5, message: "Maximum rating is 5" },
            })}
          />
          {errors.rating && (
            <p className="text-red-500 text-xs">{errors.rating.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label>Price per night*</label>
          <Input
            type="number"
            {...register("price", { required: "Price is required", min: 0 })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>

        {/* Max Guests */}
        <div>
          <label>Max Guests*</label>
          <Input
            type="number"
            {...register("maxGuests", {
              required: "Max guests required",
              min: 1,
            })}
          />
          {errors.maxGuests && (
            <p className="text-red-500 text-xs">{errors.maxGuests.message}</p>
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
          <label>Main Image URL*</label>
          <Input
            {...register("mediaUrl1", { required: "Main image URL required" })}
          />
        </div>
        <div>
          <label>Image URL 2 (optional)</label>
          <Input {...register("mediaUrl2")} />
        </div>
        <div>
          <label>Image URL 3 (optional)</label>
          <Input {...register("mediaUrl3")} />
        </div>
        <div>
          <label>Image URL 4 (optional)</label>
          <Input {...register("mediaUrl4")} />
        </div>

        {/* City */}
        <div>
          <label>City*</label>
          <Input {...register("city", { required: "City is required" })} />
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label>Country*</label>
          <Input
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <p className="text-red-500 text-xs">{errors.country.message}</p>
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
