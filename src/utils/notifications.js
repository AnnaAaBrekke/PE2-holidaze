import Swal from "sweetalert2";

const baseSwal = Swal.mixin({
  customClass: {
    confirmButton:
      "bg-[#0F6474] text-[#E0F9F6] font-medium text-lg px-6 py-2 rounded shadow-md hover:bg-[#0d5665] focus:outline-none m-0.5",
    cancelButton:
      "bg-[#A3CED6] text-[#0F6474] font-medium text-lg px-6 py-2 rounded shadow-md hover:bg-[#8FBAC2] focus:outline-none m-0.5", // lighter blue
    popup: "rounded-2xl p-6",
    title: "text-xl font-bold",
    htmlContainer: "text-base",
  },
  buttonsStyling: false,
});

export async function confirmAction(message = "Are you sure?") {
  const result = await baseSwal.fire({
    text: message,
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Yes",
    reverseButtons: true,
  });

  return result.isConfirmed;
}

export async function showAlert(
  message = "Try again or come back in a few minutes.",
) {
  await baseSwal.fire({
    icon: "error",
    html: `
      <div style="position: relative; width: 100%; max-width: 480px; background: #FFFFFF; border-radius: 1rem; padding: 2rem; font-family: 'Podkova', serif; text-align: center;">
        <h2 style="font-weight: 700; font-size: 22px; color: #101010; margin-bottom: 0.5rem;">Something went wrong!</h2>
        <p style="font-weight: 500; font-size: 20px; color: #101010;">${message}</p>
      </div>
    `,
    confirmButtonText: "Close",
    showConfirmButton: true,
    customClass: {
      popup: "rounded-2xl p-6",
      confirmButton:
        "bg-[#0F6474] text-[#E0F9F6] font-medium text-lg px-6 py-2 rounded shadow-md",
      title: "text-xl font-bold",
      htmlContainer: "text-base",
    },
    backdrop: true,
    buttonsStyling: false,
  });
}

export async function showSuccess(message) {
  await baseSwal.fire({
    html: `
    <div style="
      position: relative;
      width: 100%;
      max-width: 480px;
      border-radius: 1rem;
      padding: 2rem;
      font-family: 'Podkova', serif;
      text-align: center;
    ">
      <h1 style="
        font-weight: 500;
        font-size: 24px;
        color: #101010;
      ">${message}
      </h1>
    </div>
  `,
    icon: "success",
    confirmButtonText: "OK",
  });
}
