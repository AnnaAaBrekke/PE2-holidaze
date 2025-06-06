/**
 * ManagerDashboard - Dashboard interface for venue managers to manage their venues and view bookings.
 *
 * @component
 * @returns {JSX.Element} The rendered dashboard page for venue managers.
 *
 * Features:
 * - Only accessible to users with `venueManager` role
 * - Fetches and displays all venues managed by the current user
 * - Displays booking statistics using `ManagerStats`
 * - Allows creating and editing venues via `VenueForm`
 * - Allows deleting venues with confirmation and error handling
 * - Displays individual venue cards using `VenueCard`
 * - Shows upcoming bookings per venue using `VenueBookingsTable`
 * - Includes loading and empty states with `SkeletonLoader`
 */

import { useEffect, useRef, useState } from "react";
import { deleteVenue, getManagerVenues } from "../../services/VenueService";
import { useAuth } from "../../context/AuthContext";
import VenueForm from "../forms/Venue";
import VenueCard from "../venue/VenueCard";
import {
  confirmAction,
  showAlert,
  showSuccess,
} from "../../utils/notifications";
import SkeletonLoader from "../common/SkeletonLoader";
import ManagerStats from "./ManagerStats";
import ManagerBookingsTable from "./ManagerBookingsTable";

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
    const confirmDelete = await confirmAction(`Delete "${venue.name}"?`);
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const success = await deleteVenue(venue.id, token);
      if (success) {
        setVenues((prev) => prev.filter((v) => v.id !== venue.id));
        await showSuccess("Deleted successfully!");
      }
    } catch (error) {
      console.error("Delete failed:", error.message);
      await showAlert(`Error ${error.message}`);
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
    <div className="p-6 overflow-x-hidden">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Manager Dashboard</h1>
        <p className="text-gray-600 body-3 mb-6">
          Manage your venues, view upcoming bookings on your venues, and create
          new venues easily.
        </p>

        {/* Stats */}
        <div className="m-2">
          <ManagerStats venues={venues} />
        </div>
      </div>

      {/* New Divider here */}
      <hr className="border-t border-gray-300 my-8 max-w-5xl mx-auto" />

      {/* Your Venues Heading + Button */}
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-6">
        <h2 className="text-4xl font-semibold">Your Venues</h2>

        <button onClick={handleCreateClick} className="button-primary-style">
          {showForm ? "Close Form" : "+ Create New Venue"}
        </button>
      </div>

      {/* Form below */}
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

      {loading ? (
        <SkeletonLoader type="dashboard" />
      ) : venues.length === 0 ? (
        <p className="text-center text-gray-500">No venues created yet.</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row">
                {/* Venue Card */}
                <div className="w-full md:w-1/2 mb-4 justify-center flex">
                  <VenueCard
                    venue={venue}
                    isManager
                    onEdit={() => handleEditClick(venue)}
                    onDelete={() => handleDeleteClick(venue)}
                    isDeleting={isDeleting}
                  />
                </div>

                {/* Bookings Table */}
                <div className="w-full md:w-1/2 ml-3">
                  <h2 className="font-normal text-center">
                    Upcoming bookings for: <strong>{venue.name}</strong>
                  </h2>
                  <ManagerBookingsTable bookings={venue.bookings} />
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
