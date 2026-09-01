import projectsData from './projects.json'
import type { Project, ViewMode } from './types'

export type { Project, ViewMode }

export const projects: Project[] = projectsData as Project[]

export const galleryProjects = projects.filter(
  (project) => project.showInGallery !== false,
)

export const listProjects = [...projects].sort(
  (a, b) => a.listOrder - b.listOrder,
)

export const galleryImages = galleryProjects.map((p) => p.image)
export const listImages = projects.map((p) => p.listImage)
export const criticalImages = [...galleryImages, ...listImages]
