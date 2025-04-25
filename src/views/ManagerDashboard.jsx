import { useEffect, useRef, useState } from "react";
import { getManagerVenues, deleteVenue } from "../services/VenueService";
import { useAuth } from "../context/AuthContext";
import VenueForm from "../components/forms/Venue";
import VenueCard from "../components/Venue/VenueCard";
import VenueBookingsTable from "../components/Table";

const ManagerDashboard = () => {
  const { user, token } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [mode, setMode] = useState("create");
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  if (!user?.venueManager) {
    return (
      <div className="alert alert-danger mt-4 text-center">
        Only venue managers can access the Manager Dashboard.
      </div>
    );
  }

  // Load venues on mount
  useEffect(() => {
    const fetchVenues = async () => {
      if (!user?.name) return;

      setLoading(true);
      try {
        const result = await getManagerVenues(user.name, token);
        setVenues(result.data || []);
      } catch (error) {
        console.error("Error fetching venues:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [user?.name, token]);

  // Form and card handlers
  const handleCreateClick = () => {
    setMode("create");
    setSelectedVenue(null);
    setShowForm((prev) => !prev);
  };

  const handleEditClick = (venue) => {
    setSelectedVenue(venue);
    setMode("edit");
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeleteClick = async (venue) => {
    const confirmDelete = window.confirm(`Delete "${venue.name}"?`);
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const success = await deleteVenue(venue.id, token);
      if (success) {
        setVenues((prev) => prev.filter((v) => v.id !== venue.id));
      }
    } catch (error) {
      console.error("Delete failed:", error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleVenueSaved = (venue) => {
    setVenues((prev) =>
      mode === "edit"
        ? prev.map((v) => (v.id === venue.id ? venue : v))
        : [venue, ...prev],
    );
    setShowForm(false);
    setSelectedVenue(null);
    setMode("create");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Manager Dashboard</h1>

      <div className="text-center mb-6">
        <button
          onClick={handleCreateClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          {showForm ? "Close Form" : "+ Create New Venue"}
        </button>
      </div>

      {showForm && (
        <div ref={formRef} className="mb-12">
          <VenueForm
            mode={mode}
            venue={selectedVenue}
            venueId={selectedVenue?.id}
            onVenueSaved={handleVenueSaved}
          />
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">Your Venues</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading venues...</p>
      ) : venues.length === 0 ? (
        <p className="text-center text-gray-500">No venues created yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 justify-items-center">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="w-full flex justify-center items-start"
            >
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-5xl">
                <div className="flex-1">
                  <VenueCard
                    venue={venue}
                    isManager
                    onEdit={() => handleEditClick(venue)}
                    onDelete={() => handleDeleteClick(venue)}
                    isDeleting={isDeleting}
                  />
                </div>
                <div className="flex-1">
                  <VenueBookingsTable bookings={venue.bookings} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
