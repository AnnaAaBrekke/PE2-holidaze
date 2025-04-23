import { useMemo } from "react";
import getBookedDates from "../../utils/getBookedDates";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const VenueCalendar = ({ bookings = [] }) => {
  const bookedDates = useMemo(() => getBookedDates(bookings), [bookings]);

  const isBooked = (date) => bookedDates.includes(date.toDateString());

  return (
    <div>
      <Calendar
        tileDisabled={({ date }) => isBooked(date) || date < new Date()}
        tileClassName={({ date }) =>
          isBooked(date) ? "booked-date" : "available-date"
        }
      />
      <p>Booked dates are grey.</p>
    </div>
  );
};

export default VenueCalendar;
