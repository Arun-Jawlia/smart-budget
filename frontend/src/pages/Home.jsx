import { useCallback, useEffect, useMemo, useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import TotalBar from "@/components/TotalBar";
import { getExpenses } from "@/api/expenseApi";
import Navbar from "@/components/layout/Navbar";
import FilterBar from "@/components/FilterBar";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("date_desc");

  const fetchExpenses = useCallback(
    async (isInitial = false) => {
      if (isInitial) setLoading(true);
      else setRefreshing(true);

      setError(null);

      try {
        const res = await getExpenses(
          category === "all" ? "" : category,
          sort,
          selectedDate,
        );

        setExpenses(res.data.expenses);
      } catch {
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [category, sort, selectedDate],
  );

  console.log(sort);

  useEffect(() => {
    fetchExpenses(expenses.length === 0);
  }, [category, sort, selectedDate]);

  const total = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar total={total} />

      <main className="max-w-6xl mx-auto px-6 py-10 mt-4 grid gap-10 lg:grid-cols-[420px_1fr]">
        <section className="mt-2">
          <ExpenseForm fetchExpenses={fetchExpenses} />
        </section>

        <section className="space-y-6">
          <FilterBar
            sort={sort}
            setSort={setSort}
            category={category}
            setCategory={setCategory}
            expenses={expenses}
            refreshing={refreshing}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <div className="mt-2">
            <TotalBar total={total} />
          </div>

          <div className="mt-2">
            <ExpenseList expenses={expenses} loading={loading} error={error} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
