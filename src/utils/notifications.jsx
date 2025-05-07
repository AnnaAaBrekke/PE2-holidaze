/**
 * Custom SweetAlert utilities using SweetAlert2 with React integration.
 *
 * @functions
 * @function confirmAction - Shows a confirmation dialog with Yes/Cancel buttons.
 * @function showAlert - Displays an error alert with a custom message.
 * @function showSuccess - Displays a success message.
 * @function showBookingConfirmation - Displays a booking confirmation message with date range.
 */

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React from "react";

const SwalWithReact = withReactContent(Swal);

const baseSwal = SwalWithReact.mixin({
  customClass: {
    confirmButton:
      "bg-color-primary text-color-background font-medium text-lg px-6 py-2 rounded shadow-md hover:bg-[#0d5665] focus:outline-none m-0.5",
    cancelButton:
      "bg-[#A3CED6] text-color-primary font-medium text-lg px-6 py-2 rounded shadow-md hover:bg-[#8FBAC2] focus:outline-none m-0.5",
    popup: "rounded-2xl p-6",
    title: "text-xl font-bold",
    htmlContainer: "text-base",
  },
  buttonsStyling: false,
});

export async function confirmAction(message = "Are you sure?") {
  const result = await baseSwal.fire({
    icon: "question",
    title: "Confirm Action",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  return result.isConfirmed;
}

export async function showAlert(
  message = "Try again or come back in a few minutes.",
) {
  await baseSwal.fire({
    icon: "error",
    title: <strong>Something went wrong!</strong>,
    html: (
      <div className="text-center text-black">
        <p className="text-lg">{message}</p>
      </div>
    ),
    confirmButtonText: "Close",
    backdrop: true,
  });
}

export async function showSuccess(message = "Action completed successfully!") {
  await baseSwal.fire({
    icon: "success",
    title: "",
    html: (
      <div className="text-center font-semibold text-color-text-primary text-lg">
        {message}
      </div>
    ),
    confirmButtonText: "OK",
  });
}
// This is the booking-specific success modal
export async function showBookingConfirmation({ from, to }) {
  await baseSwal.fire({
    icon: "success",
    html: (
      <div className="text-center text-color-text-primary">
        <h2 className="font-bold text-2xl text-color-text-primary text-center mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-base">
          {from} – {to}
        </p>
        <div className="h-1 w-16 bg-color-accent mx-auto my-4 rounded-full" />
        <p className="text-color-text-body mt-2">
          A confirmation has been sent to your email and is available under "My
          bookings".
        </p>
      </div>
    ),
    confirmButtonText: "OK",
  });
}
