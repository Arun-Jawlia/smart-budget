import { useMemo, useState } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'

import { Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'

import { createExpense } from '@/api/expenseApi'

const categories = [
  'Food',
  'Travel',
  'Shopping',
  'Bills'
]

const todayIso = () =>
  new Date().toISOString().slice(0, 10)

const schema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, 'Required')
    .refine((v) => !Number.isNaN(Number(v)), 'Must be a number')
    .refine((v) => Number(v) > 0, 'Must be greater than 0'),

  category: z.string(),

  description: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(280, 'Keep under 280 characters'),

  date: z.string().min(1, 'Required')
})

const newIdempotencyKey = () =>
  crypto.randomUUID()

function ExpenseForm({ fetchExpenses }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(todayIso())

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const [idempotencyKey, setIdempotencyKey] = useState(
    newIdempotencyKey()
  )

  const today = useMemo(todayIso, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (submitting) return

    const parsed = schema.safeParse({
      amount,
      category,
      description,
      date
    })

    if (!parsed.success) {
      const fieldErrors = {}

      parsed.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message
      })

      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      await createExpense(
        {
          amount: Number(amount) * 100,
          category,
          description,
          date
        },
        idempotencyKey
      )

      toast.success('Expense recorded')

      setAmount('')
      setDescription('')
      setDate(today)

      setIdempotencyKey(newIdempotencyKey())

      fetchExpenses()

    } catch {
      toast.error('Failed to save expense')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-lg border bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-semibold">
          Record an expense
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Safe retries with idempotent writes
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">

        <div className="space-y-1.5">
          <Label>Amount (₹)</Label>

          <Input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={submitting}
          />

          {errors.amount && (
            <p className="text-xs text-red-500">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Category</Label>

          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label>Description</Label>

          <Textarea
            rows={2}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            disabled={submitting}
          />

          {errors.description && (
            <p className="text-xs text-red-500">
              {errors.description}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Date</Label>

          <Input
            type="date"
            max={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default ExpenseForm