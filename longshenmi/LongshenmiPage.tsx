import { ProjectCasePage } from '../src/components/ProjectCasePage'
import { projectMeta, showcase } from './data'

export function LongshenmiPage() {
  return (
    <ProjectCasePage
      meta={projectMeta}
      showcase={showcase}
      ariaLabel="Longshenmi project intro"
    />
  )
}
