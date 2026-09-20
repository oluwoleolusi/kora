import type { Size } from '../../types'

interface Props {
  sizes: Size[]
  selected: Size | null
  onSelect: (size: Size) => void
  error?: string
}

export default function SizeSelector({ sizes, selected, onSelect, error }: Props) {
  if (sizes.length === 1) {
    return null
  }

  return (
    <div>
      <p className="field-label">Size</p>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="radiogroup"
        aria-label="Size"
        aria-invalid={Boolean(error)}
      >
        {sizes.map((size) => {
          const isSelected = selected === size
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(size)}
              className={`min-w-12 border px-3 py-2.5 text-sm transition-colors ${
                isSelected
                  ? 'border-ink bg-ink text-bone-soft'
                  : error
                    ? 'border-signal text-ink'
                    : 'border-line text-ink hover:border-ink'
              }`}
            >
              {size}
            </button>
          )
        })}
      </div>
      {error && <p className="mt-2 text-xs text-signal">{error}</p>}
    </div>
  )
}
