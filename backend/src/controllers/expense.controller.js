const Expense = require('../models/expense.model')
const validateExpense = require('../utils/validateExpense')

const createExpense = async (req, res, next) => {
  try {
    const key = req.headers['idempotency-key']

    if (!key) {
      return res.status(400).json({
        message: 'Idempotency-Key header is required'
      })
    }

    const validationError = validateExpense(req.body)

    if (validationError) {
      return res.status(400).json({
        message: validationError
      })
    }

    const existingExpense = await Expense.findOne({
      idempotencyKey: key
    })

    if (existingExpense) {
      return res.status(200).json(existingExpense)
    }

    const expense = await Expense.create({
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
      idempotencyKey: key
    })

    res.status(201).json(expense)

  } catch (error) {
    next(error)
  }
}

const getExpenses = async (req, res, next) => {
  try {
    const { category, sort } = req.query

    let filter = {}

    if (category) {
      filter.category = category
    }

    let query = Expense.find(filter)

    if (sort === 'date_desc') {
      query = query.sort({ date: -1 })
    }

    const expenses = await query

    const total = expenses.reduce((sum, item) => sum + item.amount, 0)

    res.status(200).json({
      expenses,
      total
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  createExpense,
  getExpenses
}