/**
 * VenueForm - A form component for creating or editing a venue listing.
 *
 * @component
 * @param {Object} props
 * @param {"create"|"edit"} [props.mode="create"] - Form mode: "create" for new venues or "edit" for updating.
 * @param {Object} [props.venue={}] - Existing venue data to populate the form in edit mode.
 * @param {string} [props.venueId] - The ID of the venue being edited (required in edit mode).
 * @param {Function} [props.onVenueSaved] - Callback triggered after a venue is successfully created or updated.
 * @returns {JSX.Element} A venue creation or update form with validation, image previews, and amenity toggles.
 *
 * Features:
 * - Uses `react-hook-form` for validation and state management
 * - Dynamically previews up to 4 venue images
 * - Validates and formats numeric fields like rating, price, and guest count
 * - Supports conditional logic based on mode (create or edit)
 * - Handles API integration via `createVenue` and `updateVenue` services
 */

import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { createVenue, updateVenue } from "../../services/VenueService";
import { confirmAction, showSuccess } from "../../utils/notifications";
import { useEffect, useState } from "react";
import SubmitFormButton from "../buttons/SubmitFormButton";

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
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {mode === "edit" ? "Edit Venue" : "Create Venue"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmitVenueForm)}
        className="form-style"
        noValidate
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="label-style">
            Name*
          </label>
          <input
            id="name"
            className="input-style"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="label-style">
            Description*
          </label>
          <textarea
            id="description"
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
          <label htmlFor="rating" className="label-style">
            Rating (0-5)
          </label>
          <input
            id="rating"
            type="number"
            className="input-style"
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
          <label htmlFor="price" className="label-style">
            Price per night*
          </label>
          <input
            id="price"
            type="number"
            className="input-style"
            {...register("price", { required: "Price is required", min: 0 })}
          />
          {errors.price && <p className="error-text">{errors.price.message}</p>}
        </div>

        {/* Max Guests */}
        <div>
          <label htmlFor="maxGuests" className="label-style">
            Max Guests*
          </label>
          <input
            id="maxGuests"
            type="number"
            className="input-style"
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
          <div className="grid grid-cols-2 gap-4 mb-4">
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
        {[1, 2, 3, 4].map((num) => (
          <div key={num}>
            <label htmlFor={`mediaUrl${num}`} className="label-style">
              {num === 1 ? "Main Image URL*" : `Image URL ${num} (optional)`}
            </label>
            <input
              id={`mediaUrl${num}`}
              className="input-style"
              {...register(
                `mediaUrl${num}`,
                num === 1 ? { required: "Main image URL required" } : {},
              )}
            />
            {errors[`mediaUrl${num}`] && (
              <p className="error-text">{errors[`mediaUrl${num}`].message}</p>
            )}
          </div>
        ))}

        {/* City */}
        <div>
          <label htmlFor="city" className="label-style">
            City*
          </label>
          <input
            id="city"
            className="input-style"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p className="error-text">{errors.city.message}</p>}
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="label-style">
            Country*
          </label>
          <input
            id="country"
            className="input-style"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <p className="error-text">{errors.country.message}</p>
          )}
        </div>

        {/* Amenities */}
        <fieldset className="mt-4">
          <legend className="label-style mb-2">Amenities</legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("meta.wifi")} />
              <span>Free Wifi</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("meta.parking")} />
              <span>Parking</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("meta.breakfast")} />
              <span>Free Breakfast</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("meta.pets")} />
              <span>Pets Allowed</span>
            </label>
          </div>
        </fieldset>

        {/* Submit */}
        <SubmitFormButton loading={loading}>
          {mode === "edit" ? "Update Venue" : "Create Venue"}
        </SubmitFormButton>
      </form>
    </div>
  );
};

export default VenueForm;
