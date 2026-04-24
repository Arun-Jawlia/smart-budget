import { useState } from 'react'
import { createExpense } from '../api/expenseApi'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function ExpenseForm({ fetchExpenses }) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const key = crypto.randomUUID()

      await createExpense(
        {
          ...form,
          amount: Number(form.amount) * 100
        },
        key
      )

      setForm({
        amount: '',
        category: '',
        description: '',
        date: ''
      })

      fetchExpenses()

    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <Input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <Button disabled={loading}>
            {loading ? 'Saving...' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ExpenseForm