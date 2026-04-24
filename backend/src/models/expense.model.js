const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  idempotencyKey: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense