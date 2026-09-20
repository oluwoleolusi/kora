import type { LookbookStory } from '../types'

export const lookbookStories: LookbookStory[] = [
  {
    slug: 'form-and-movement',
    title: 'Form & Movement',
    season: 'AW26',
    image: `${import.meta.env.BASE_URL}images/lookbook-01.jpg`,
    excerpt:
      'A study in how structure and drape sit against each other across the season\u2019s outerwear.',
    body: [
      'The starting point for this season was a single question: how much structure can a garment hold before it stops moving with the person wearing it.',
      'Sena and Kessie sit at opposite ends of that question — one built for architecture, the other for weight and warmth. Both are cut generously enough to move through a full range of motion, tested against the same fitting brief.',
      'Shot on location in a single afternoon, with no changes to the lighting setup between looks. What changes is the garment.',
    ],
  },
  {
    slug: 'the-new-silhouette',
    title: 'The New Silhouette',
    season: 'AW26',
    image: `${import.meta.env.BASE_URL}images/lookbook-02.jpg`,
    excerpt: 'Wide-leg tailoring, dropped shoulders, and proportion as the season\u2019s main idea.',
    body: [
      'Proportion carried more weight than embellishment this season. Waistlines sit higher, shoulders sit looser, and hems fall longer than what came before.',
      'Amara\u2019s trouser and Ilo\u2019s shirt were developed together, deliberately — the intention was always a single silhouette rather than separate pieces styled after the fact.',
      'Nothing here is cropped for the sake of it. Every proportion decision traces back to how the piece is meant to be worn.',
    ],
  },
  {
    slug: 'material-study',
    title: 'Material Study',
    season: 'AW26',
    image: `${import.meta.env.BASE_URL}images/lookbook-03.jpg`,
    excerpt: 'Close details on the wool, silk, and leather running through this season\u2019s collection.',
    body: [
      'This story exists because fabric rarely gets the same attention as silhouette, and this season it deserved it.',
      'The virgin wool in Kessie is heavier than anything we\u2019ve used before. The silk in Tolu is cut on the bias specifically because a straight grain flattened the drape we wanted.',
      'None of this is visible at a glance. It is felt when the piece is worn, which is the only test that matters.',
    ],
  },
]

export function getStoryBySlug(slug: string): LookbookStory | undefined {
  return lookbookStories.find((s) => s.slug === slug)
}
