import { API } from "./axios"


export const createExpense = (data, key) =>
  API.post('/expenses', data, {
    headers: {
      'Idempotency-Key': key
    }
  })

export const getExpenses = (category = '') =>
  API.get(`/expenses?category=${category}&sort=date_desc`)