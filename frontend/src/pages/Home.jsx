import { useCallback, useEffect, useMemo, useState } from 'react'
import ExpenseForm from '@/components/ExpenseForm'
import ExpenseList from '@/components/ExpenseList'
import TotalBar from '@/components/TotalBar'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

import { getExpenses } from '@/api/expenseApi'
import Navbar from '@/components/layout/Navbar'

function Home() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('date_desc')

  const fetchExpenses = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true)
    else setRefreshing(true)

    setError(null)

    try {
      const res = await getExpenses(
        category === 'all' ? '' : category,
        sort
      )

      setExpenses(res.data.expenses)

    } catch {
      setError('Failed to load expenses')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [category, sort])

  useEffect(() => {
    fetchExpenses(expenses.length === 0)
  }, [category, sort])

  const total = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0)
  }, [expenses])

return (
  <div className="min-h-screen bg-slate-50">
    <Navbar total={total} />

    <main className="max-w-6xl mx-auto px-6 py-10 mt-4 grid gap-10 lg:grid-cols-[420px_1fr]">

      <section className="mt-2">
        <ExpenseForm fetchExpenses={fetchExpenses} />
      </section>

      <section className="space-y-6">

        <div className="flex flex-wrap items-end justify-between gap-6">

          <div>
            <h2 className="text-2xl font-semibold">
              Recent Activity
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              {expenses.length} entries
            </p>
          </div>

          <div className="flex flex-wrap gap-4">

            <div className="space-y-1">
              <Label>Category</Label>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Bills">Bills</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Sort</Label>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="date_desc">Newest first</SelectItem>
                  <SelectItem value="date_asc">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {refreshing && (
              <div className="flex items-center text-xs text-muted-foreground mt-6">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Updating
              </div>
            )}
          </div>
        </div>

        <div className="mt-2">
          <TotalBar total={total} />
        </div>

        <div className="mt-2">
          <ExpenseList
            expenses={expenses}
            loading={loading}
            error={error}
          />
        </div>

      </section>
    </main>
  </div>
)
}

export default Home