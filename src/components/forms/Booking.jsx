import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useMemo, useState } from "react";
import getBookedDates from "../../utils/getBookedDates";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { createBooking } from "../../services/BookingService";
import {
  confirmAction,
  showAlert,
  showBookingConfirmation,
} from "../../utils/notifications";
import "../../styles/form.css";
import "../../styles/button.css";
import SubmitFormButton from "../buttons/submitFormButton";

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
      await showBookingConfirmation({ from: formattedFrom, to: formattedTo });

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
          <p className="text-muted text-lg mt-3 mb-3">
            You must be logged in to make a booking.
          </p>
          <Link to="/login" className="text-sm button-secondary-style mr-2">
            Log In
          </Link>
          <Link
            to="/register"
            className="text-sm bg-[#0E4551] button-secondary-style"
          >
            Register
          </Link>
        </div>
      ) : user.name === ownerName ? (
        <div className="flex flex-col text-center mt-3">
          <p className="text-color-error">You cannot book your own venue.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitForm)} className="form-style">
          <div>
            <label className="label-style" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input-style"
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
              <p className="error-text">{errors.email.message}</p>
            )}

            {/* Calendar Date Picker */}
            <div className="mt-4">
              <label className="label-style">Select Date Range</label>
              <Calendar
                selectRange
                onChange={setDateRange}
                value={dateRange}
                tileDisabled={({ date }) =>
                  bookedDates.includes(date.toDateString()) || date < new Date()
                }
              />
              {(!dateFrom || !dateTo) && (
                <p className="error-text">Please pick a start and end date</p>
              )}
            </div>

            <label className="label-style" htmlFor="guests">
              Guests
            </label>
            <input
              id="guests"
              className="input-style"
              type="number"
              {...register("guests", {
                required: "Guest count is required",
                min: { value: 1, message: "At least 1 guest" },
                max: {
                  value: maxGuests || 15,
                  message: `Cannot book more than ${maxGuests} guests`,
                },
              })}
            />
            {errors.guests && (
              <p className="error-text">{errors.guests.message}</p>
            )}

            {numberOfNights > 0 && (
              <div className=" text-gray-700 text-center mt-4">
                <p>
                  <span className="font-bold text-color-primary mr-1">
                    {numberOfNights}
                  </span>
                  - Total Nights
                </p>
                <p>
                  <span className="font-bold text-color-primary mr-1">
                    ${totalPrice}
                  </span>
                  - Total Price
                </p>
              </div>
            )}
          </div>
          {error && <p className="error-text">{error}</p>}
          <SubmitFormButton loading={loading} loadingText="Booking...">
            Book now
          </SubmitFormButton>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
