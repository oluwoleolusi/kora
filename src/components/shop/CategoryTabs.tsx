const options = ['All', 'New Arrivals', 'Ready-to-Wear', 'Outerwear', 'Knitwear', 'Accessories'] as const

export type ShopCategory = (typeof options)[number]

interface Props {
  active: ShopCategory
  onChange: (value: ShopCategory) => void
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="scrollbar-none flex gap-7 overflow-x-auto"
    >
      {options.map((option) => {
        const isActive = option === active
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={`shrink-0 whitespace-nowrap border-b pb-2 text-[0.8rem] uppercase tracking-wideish transition-colors duration-200 ${
              isActive ? 'border-ink text-ink' : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
