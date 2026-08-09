import { ProjectCasePage } from '../src/components/ProjectCasePage'
import { projectMeta, showcase } from './data'

export function FabPage() {
  return (
    <ProjectCasePage
      meta={projectMeta}
      showcase={showcase}
      ariaLabel="Fab project intro"
    />
  )
}
