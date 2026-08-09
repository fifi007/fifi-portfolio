import type { ProjectCaseMeta, ShowcaseItem } from '../src/components/ProjectCasePage'

export const projectMeta: ProjectCaseMeta = {
  title: '水彩&彩铅手绘 Watercolor & Colored Pencil Hand-drawn',
}

/** Figma order by Y */
export const showcase: ShowcaseItem[] = [
  { type: 'image', src: '/assets/projects/watercolor/vegetable-2.jpg', alt: '手绘作品 vegetable' },
  { type: 'image', src: '/assets/projects/watercolor/dsc-0062e.jpg', alt: '手绘作品 e' },
  { type: 'image', src: '/assets/projects/watercolor/dsc-0062d.jpg', alt: '手绘作品 d' },
  { type: 'image', src: '/assets/projects/watercolor/dsc-0062c.jpg', alt: '手绘作品 c' },
  { type: 'image', src: '/assets/projects/watercolor/dsc-0062j.jpg', alt: '手绘作品 j' },
  { type: 'image', src: '/assets/projects/watercolor/dsc-0062g.jpg', alt: '手绘作品 g' },
  { type: 'image', src: '/assets/projects/watercolor/mask-group.jpg', alt: '手绘作品 mask' },
  { type: 'image', src: '/assets/projects/watercolor/dsc-0062i.jpg', alt: '手绘作品 i' },
  { type: 'image', src: '/assets/projects/watercolor/img-20160902.jpg', alt: '手绘作品 img' },
  { type: 'image', src: '/assets/projects/watercolor/015e7a.jpg', alt: '手绘作品 015e7a' },
  { type: 'image', src: '/assets/projects/watercolor/dsc-0062f.jpg', alt: '手绘作品 f' },
]

export const ROUTE_PATH = '/projects/watercolor'
