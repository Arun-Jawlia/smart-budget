import { formatPaise } from '@/lib/money'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, Inbox } from 'lucide-react'

const formatDate = (iso) => {
  const d = new Date(iso)

  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

function ExpenseList({ expenses, loading, error }) {
  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-red-300 bg-red-50 px-6 py-12 text-center">
        <AlertCircle className="h-6 w-6 text-red-500" />

        <div>
          <p className="font-medium">Couldn't load expenses</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (loading && expenses.length === 0) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-16 text-center">
        <Inbox className="h-6 w-6 text-muted-foreground" />

        <div>
          <p className="font-medium">No expenses yet</p>
          <p className="text-sm text-muted-foreground">
            Add your first expense using the form.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ul className="divide-y rounded-lg border bg-white">
      {expenses.map((expense) => (
        <li
          key={expense._id}
          className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-5 py-4 sm:grid-cols-[110px_1fr_120px_auto]"
        >
          <div className="text-xs uppercase text-muted-foreground">
            {formatDate(expense.date)}
          </div>

          <div>
            <p className="truncate font-medium">
              {expense.description}
            </p>
          </div>

          <div className="hidden text-xs uppercase text-muted-foreground sm:block">
            {expense.category}
          </div>

          <div className="justify-self-end font-semibold">
            {formatPaise(expense.amount)}
          </div>

          <div className="col-span-2 text-xs text-muted-foreground sm:hidden">
            {expense.category}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList