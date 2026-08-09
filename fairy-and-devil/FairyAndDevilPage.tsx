import { ProjectCasePage } from '../src/components/ProjectCasePage'
import { projectMeta, showcase } from './data'

export function FairyAndDevilPage() {
  return (
    <ProjectCasePage
      meta={projectMeta}
      showcase={showcase}
      ariaLabel="FairyAndDevil project intro"
    />
  )
}
