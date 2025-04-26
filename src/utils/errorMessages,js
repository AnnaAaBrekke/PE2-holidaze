export function friendlyError(message) {
  if (!message) return "Something went wrong. Please try again.";

  if (message.toLowerCase().includes("invalid email or password")) {
    return "Incorrect email or password. Please try again.";
  }
  if (message.toLowerCase().includes("email already exists")) {
    return "This email is already registered. Please log in instead.";
  }
  if (message.toLowerCase().includes("invalid")) {
    return "Invalid details provided. Please double-check your information.";
  }
  if (message.toLowerCase().includes("unauthorized")) {
    return "You are not authorized. Please log in.";
  }
  if (message.toLowerCase().includes("network")) {
    return "Network error. Please check your internet connection.";
  }
  if (message.toLowerCase().includes("not found")) {
    return "The requested venue could not be found.";
  }
  return "Something went wrong. Please try again later.";
}
