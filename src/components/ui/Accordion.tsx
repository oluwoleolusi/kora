import { useId, useState } from 'react'
import type { ReactNode } from 'react'

interface AccordionItem {
  title: string
  content: ReactNode
}

export default function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)
  const baseId = useId()

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-4 text-left"
              >
                <span className="text-[0.85rem] uppercase tracking-wideish text-ink">{item.title}</span>
                <span
                  aria-hidden="true"
                  className={`relative h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-atelier ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  <span className="absolute left-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-ink" />
                  <span className="absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 bg-ink" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-300 ease-atelier ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-sm leading-relaxed text-ink-soft">{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
