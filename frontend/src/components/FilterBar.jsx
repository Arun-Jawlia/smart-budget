import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
function FilterBar({
  category,
  setCategory,
  expenses,
  refreshing,
  sort,
  setSort,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <h2 className="text-2xl font-semibold">Recent Activity</h2>

        <p className="text-sm text-muted-foreground mt-1">
          {expenses.length} entries
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="space-y-1">
          <Label>Category</Label>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40">
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
            <SelectTrigger className="w-42.5">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="date_desc">Newest first</SelectItem>
              <SelectItem value="date_asc">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Date</Label>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md px-3 py-2 h-10"
          />
        </div>

        {refreshing && (
          <div className="flex items-center text-xs text-muted-foreground mt-6">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Updating
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
