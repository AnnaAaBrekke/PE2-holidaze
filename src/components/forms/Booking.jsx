import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useMemo, useState } from "react";
import getBookedDates from "../../utils/getBookedDates";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { createBooking } from "../../services/BookingService";
import { MdWarningAmber } from "react-icons/md";
import {
  confirmAction,
  showAlert,
  showSuccess,
} from "../../utils/notifications";

const BookingForm = ({
  venueId,
  bookings = [],
  ownerName,
  onClose,
  onBookingCreated,
  price,
  maxGuests,
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
      email: user?.email || "",
    },
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [dateFrom, dateTo] = dateRange;

  const numberOfNights =
    dateFrom && dateTo
      ? Math.ceil((dateTo - dateFrom) / (1000 * 60 * 60 * 24))
      : 0;
  const totalPrice = numberOfNights * (price || 0);

  const onSubmitForm = async (bookingFormData) => {
    if (!dateFrom || !dateTo) {
      setError("Please select a date range");
      return;
    }

    const confirmed = await confirmAction(
      "This will create a new booking. Do you want to continue?",
    );
    if (!confirmed) {
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
        totalPrice,
      });

      onBookingCreated?.();
      onClose?.();

      const formattedFrom = new Date(dateFrom).toLocaleDateString();
      const formattedTo = new Date(dateTo).toLocaleDateString();
      await showSuccess(`
        <div style="position: relative; width: 100%; max-width: 480px; text-align: center; font-family: 'Podkova', serif;">
          
          <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 24px; font-weight: 700; color: #101010; margin-bottom: 0.5rem;">BOOKING CONFIRMED!</h2>
            <div style="width: 60px; height: 6px; background: #AFCDA2; margin: 0 auto 1rem auto; border-radius: 3px;"></div>
          </div>
      
          <div style="font-size: 20px; font-weight: 400; color: #101010; margin-bottom: 1rem;">
            ${formattedFrom} - ${formattedTo}
          </div>
      
          <div style="font-size: 22px; font-weight: 400; color: #939393; margin-top: 1rem;">
            A booking confirmation is sent to your email and you find it under 'My bookings'!
          </div>
      
        </div>
      `);

      reset();
    } catch (error) {
      setError(error.message);
      await showAlert(`Error: ${error.message}`);
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
                  message: "Must be a stud.noroff.no email address",
                },
                validate: (value) =>
                  value === user?.email ||
                  "Email must match your registered email",
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            {/* Calendar Date Picker */}
            <div className="mt-4">
              <label>Select Date Range</label>
              <Calendar
                selectRange
                onChange={setDateRange}
                value={dateRange}
                tileDisabled={({ date }) =>
                  bookedDates.includes(date.toDateString()) || date < new Date()
                }
              />
              {(!dateFrom || !dateTo) && (
                <p className="text-sm text-red-500">
                  Please pick a start and end date
                </p>
              )}
            </div>

            <label className="mt-4" htmlFor="guests">
              Guests
            </label>
            <input
              id="guests"
              type="number"
              {...register("guests", {
                required: "Guest count is required",
                min: { value: 1, message: "At least 1 guest" },
                max: {
                  value: maxGuests || 10, // fallback max if missing
                  message: `Cannot book more than ${maxGuests} guests`,
                },
              })}
            />
            {errors.guests && (
              <p className="text-sm text-red-500">{errors.guests.message}</p>
            )}

            {numberOfNights > 0 && (
              <div>
                <p>Total Nights: {numberOfNights}</p>
                <p>Total Price: ${totalPrice} </p>
              </div>
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
