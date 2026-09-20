import type { SortOption } from '../../types'

const options: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

interface Props {
  value: SortOption
  onChange: (value: SortOption) => void
}

export default function SortSelect({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-[0.8rem] uppercase tracking-wideish text-ink-soft">
        Sort
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border-0 border-b border-line bg-transparent py-1 text-[0.85rem] text-ink outline-none focus:border-ink"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
