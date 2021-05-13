export function formatDateLabels(dateObj) {
  return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`
}
