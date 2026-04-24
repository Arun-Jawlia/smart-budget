import { Input } from '@/components/ui/input'

function FilterBar({ category, setCategory }) {
  return (
    <div className="mb-4">
      <Input
        placeholder="Filter by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
    </div>
  )
}

export default FilterBar