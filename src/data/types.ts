export type ViewMode = 'gallery' | 'list'

export type ProjectSize = 'large' | 'small'

export interface Project {
  id: string
  title: string
  image: string
  listImage: string
  size: ProjectSize
  /** Figma Image slider absolute position on 2600×460 board */
  x: number
  y: number
  /** Bounding box of pre-rotated @2x PNG (1x CSS px) */
  width: number
  height: number
  /** Baked tilt inside the PNG; used to straighten on hover */
  rotation: number
  /** List view order matching Figma dashboard-2 */
  listOrder: number
  /** Optional dedicated project page path */
  href?: string
  /** When false, project appears in list only (not gallery). Default true. */
  showInGallery?: boolean
}
