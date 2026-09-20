import { useState } from 'react'

interface Props {
  images: [string, string]
  productName: string
}

export default function ProductGallery({ images, productName }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="aspect-[4/5] w-full overflow-hidden bg-stone/50">
        <img
          src={images[active]}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 flex gap-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1} of ${productName}`}
            aria-pressed={active === index}
            className={`h-20 w-16 overflow-hidden border transition-colors ${
              active === index ? 'border-ink' : 'border-line hover:border-ink-soft'
            }`}
          >
            <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
