import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useMemo, useState } from "react";
import getBookedDates from "../../utils/getBookedDates";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { createBooking } from "../../services/BookingService";
import { MdWarningAmber } from "react-icons/md";

const BookingForm = ({
  venueId,
  bookings = [],
  ownerName,
  onClose,
  onBookingCreated,
}) => {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bookedDates = useMemo(() => getBookedDates(bookings), [bookings]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      guests: 2,
    },
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [dateFrom, dateTo] = dateRange;

  const onSubmitForm = async (bookingFormData) => {
    if (!dateFrom || !dateTo) {
      setError("Please select a date range");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await createBooking({
        ...bookingFormData,
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString(),
        guests: Number(bookingFormData.guests),
        token,
        venueId,
      });

      onBookingCreated?.(); 
      onClose?.();
      alert("Booking Created. A booking confirmation is sent to your email.");
      reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-3 mt-4 border rounded">
      <h4>Book This Venue</h4>

      {!user ? (
        <div className="text-center">
          <p className="text-muted mt-3">
            You must be logged in to make a booking.
          </p>
          <Link to="/login" className="btn btn-outline-primary me-2">
            Log In
          </Link>
          <Link to="/register" className="btn btn-outline-secondary">
            Register
          </Link>
        </div>
      ) : user.name === ownerName ? (
        <div className="alert alert-warning text-center mt-3">
          <MdWarningAmber /> You cannot book your own venue.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
                  message: "The email must be a valid stud.noroff.no address.",
                },
                validate: (value) =>
                  value === user?.email ||
                  "This email must match your registered email",
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <div className="mt-4">
              <label>Select Date Range</label>
              <Calendar
                selectRange
                onChange={setDateRange}
                value={dateRange}
                tileDisabled={({ date }) =>
                  bookedDates.includes(date.toDateString()) || date < new Date()
                }
                tileClassName={({ date }) =>
                  bookedDates.includes(date.toDateString())
                    ? "booked-date"
                    : "available-date"
                }
              />
              {(!dateFrom || !dateTo) && (
                <p className="text-sm text-red-500">
                  Please pick a start and end date
                </p>
              )}
            </div>

            <label className="mt-4">Guests</label>
            <input
              type="number"
              {...register("guests", { required: true, min: 1 })}
            />
            {errors.guests && (
              <p className="text-sm text-red-500">Guest is required</p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-4"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
