const VenueBookingsTable = ({ bookings = [] }) => {
  if (!bookings || bookings.length === 0) {
    return <p className="text-gray-500 mt-2">No bookings on this venue yet.</p>;
  }

  return (
    <div className="relative  shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3 border border-gray-200">Customer</th>
            <th className="px-6 py-3 border border-gray-200">
              When (From - To)
            </th>
            <th className="px-6 py-3 border border-gray-200">Guests</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, tableId) => (
            <tr key={tableId} className="bg-white hover:bg-gray-50 transition">
              <td className="px-12 py-4 flex items-center gap-3 border border-gray-200">
                <img
                  src={booking.customer.avatar?.url}
                  alt={booking.customer.avatar?.alt || "Customer Avatar"}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="font-medium">{booking.customer.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-200">
                {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 border border-gray-200">
                {booking.guests}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueBookingsTable;
