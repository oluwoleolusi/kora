interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 9,
  size = 'md',
}: QuantityStepperProps) {
  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-sm'

  return (
    <div className="inline-flex items-center border border-line" role="group" aria-label="Quantity">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${padding} text-ink-soft transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-30`}
      >
        −
      </button>
      <span className={`${padding} min-w-8 text-center text-ink`}>{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`${padding} text-ink-soft transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-30`}
      >
        +
      </button>
    </div>
  )
}
