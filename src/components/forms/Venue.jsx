import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { createVenue, updateVenue } from "../../services/VenueService";
import { confirmAction, showSuccess } from "../../utils/notifications";
import { useEffect } from "react";

const VenueForm = ({ mode = "create", venue = {}, venueId, onVenueSaved }) => {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const mediaUrls = watch(["mediaUrl1", "mediaUrl2", "mediaUrl3", "mediaUrl4"]);
  const previewImages = mediaUrls.filter((url) => url); // derived directly

  useEffect(() => {
    if (mode === "edit" && venue) {
      reset({
        name: venue.name || "",
        description: venue.description || "",
        price: venue.price || "",
        maxGuests: venue.maxGuests || "",
        mediaUrl1: venue.media?.[0]?.url || "",
        mediaUrl2: venue.media?.[1]?.url || "",
        mediaUrl3: venue.media?.[2]?.url || "",
        mediaUrl4: venue.media?.[3]?.url || "",
        mediaAlt: venue.media?.[0]?.alt || "",
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
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      media: [
        formData.mediaUrl1,
        formData.mediaUrl2,
        formData.mediaUrl3,
        formData.mediaUrl4,
      ]
        .filter((url) => url)
        .map((url) => ({
          url,
          alt: formData.name,
        })),
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
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">
        {mode === "edit" ? "Edit Venue" : "Create Venue"}
      </h2>
      <h3>Fill in form</h3>

      <form onSubmit={handleSubmit(onSubmitVenueForm)} noValidate>
        {/* Basic Fields */}
        <div className="mb-3">
          <label className="form-label">Name*</label>
          <input
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Description*</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Price*</label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            {...register("price", { required: "Price is required", min: 0 })}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Max Guests*</label>
          <input
            type="number"
            className={`form-control ${errors.maxGuests ? "is-invalid" : ""}`}
            {...register("maxGuests", {
              required: "Max guests is required",
              min: 1,
            })}
          />
          {errors.maxGuests && (
            <div className="invalid-feedback">{errors.maxGuests.message}</div>
          )}
        </div>

        {/* Image Previews */}
        {previewImages.length > 0 && (
          <div className="mb-6">
            <label className="form-label">Image Previews:</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {previewImages.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-40 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Media Inputs */}
        <div className="mb-3">
          <label>Main Image URL*</label>
          <input
            className={`form-control ${errors.mediaUrl1 ? "is-invalid" : ""}`}
            {...register("mediaUrl1", {
              required: "Main Image URL is required",
            })}
          />
        </div>

        <div className="mb-3">
          <label>Image URL 2 (optional)</label>
          <input className="form-control" {...register("mediaUrl2")} />
        </div>

        <div className="mb-3">
          <label>Image URL 3 (optional)</label>
          <input className="form-control" {...register("mediaUrl3")} />
        </div>

        <div className="mb-3">
          <label>Image URL 4 (optional)</label>
          <input className="form-control" {...register("mediaUrl4")} />
        </div>

        {/* Other fields */}
        <div className="mb-3">
          <label>City*</label>
          <input
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            {...register("city", { required: "City is required" })}
          />
        </div>

        <div className="mb-3">
          <label>Country*</label>
          <input
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
            {...register("country", { required: "Country is required" })}
          />
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <label className="form-label d-block">Amenities</label>
          <div className="form-check">
            <input
              type="checkbox"
              id="wifi"
              className="form-check-input"
              {...register("meta.wifi")}
            />
            <label className="form-check-label" htmlFor="wifi">
              Free Wifi
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="parking"
              className="form-check-input"
              {...register("meta.parking")}
            />
            <label className="form-check-label" htmlFor="parking">
              Parking
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="breakfast"
              className="form-check-input"
              {...register("meta.breakfast")}
            />
            <label className="form-check-label" htmlFor="breakfast">
              Free Breakfast
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="pets"
              className="form-check-input"
              {...register("meta.pets")}
            />
            <label className="form-check-label" htmlFor="pets">
              Pets Allowed
            </label>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          {mode === "edit" ? "Update Venue" : "Create Venue"}
        </button>
      </form>
    </div>
  );
};

export default VenueForm;
