const VenueBookingsTable = ({ bookings = [] }) => {
  if (!bookings || bookings.length === 0) {
    return <p className="text-gray-500 mt-2">No bookings on this venue yet.</p>;
  }

  return (
    <div className="relative shadow-md sm:rounded-lg mt-4 hover:shadow-xl">
      <table className="w-full text-xs text-left text-gray-700 border border-gray-200">
        <thead className="text-[11px] text-gray-600 uppercase bg-gray-100">
          <tr>
            <th className="px-3 py-2 border border-gray-200">Customer</th>
            <th className="px-3 py-2 border border-gray-200">When</th>
            <th className="px-3 py-2 border border-gray-200">Guests</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, tableId) => (
            <tr key={tableId} className="bg-white hover:bg-gray-50 transition">
              <td className="px-3 py-2 flex items-center gap-2 border border-gray-200">
                <img
                  src={
                    booking.customer.avatar?.url ||
                    "https://plus.unsplash.com/premium_photo-1682308170035-ec5ef069ee10?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGF2YXRhciUyMGZha2V8ZW58MHx8MHx8fDA%3D"
                  }
                  alt={booking.customer.avatar?.alt || "Customer Avatar"}
                  className="w-6 h-6 rounded-full object-cover border"
                />
                <span className="text-[11px] break-words max-w-[60px]">
                  {booking.customer.name}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap border border-gray-200">
                {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </td>
              <td className="px-3 py-2 border border-gray-200">
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
