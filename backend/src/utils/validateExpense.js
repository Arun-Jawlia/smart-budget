const validateExpense = ({ amount, category, description, date }) => {
  if (!amount || amount <= 0) {
    return 'Amount must be greater than 0'
  }

  if (!category) {
    return 'Category is required'
  }

  if (!description) {
    return 'Description is required'
  }

  if (!date) {
    return 'Date is required'
  }

  return null
}

module.exports = validateExpense