export const formatPaise = (amount) => {
  return `₹${(amount / 100).toFixed(2)}`
}