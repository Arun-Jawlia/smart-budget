import { useEffect, useState } from 'react'
import { getExpenses } from './api/expenseApi'

import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import FilterBar from './components/FilterBar'
import TotalBar from './components/TotalBar'

function App() {
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchExpenses = async () => {
    setLoading(true)

    try {
      const res = await getExpenses(category)

      setExpenses(res.data.expenses)
      setTotal(res.data.total)

    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchExpenses()
  }, [category])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Expense Tracker
      </h1>

      <ExpenseForm fetchExpenses={fetchExpenses} />

      <FilterBar
        category={category}
        setCategory={setCategory}
      />

      <TotalBar total={total} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ExpenseTable expenses={expenses} />
      )}
    </div>
  )
}

export default App