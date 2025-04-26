export function confirmAction(message = "Are you sure?") {
  return window.confirm(message);
}
export function showAlert(message) {
  return window.confirm(message);
}
export function showSuccess(message) {
  return window.confirm(`Success: ${message}}`);
}
