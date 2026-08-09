import { ProjectCasePage } from '../src/components/ProjectCasePage'
import { projectMeta, showcase } from './data'

export function OvfPage() {
  return (
    <ProjectCasePage
      meta={projectMeta}
      showcase={showcase}
      ariaLabel="Ovf project intro"
    />
  )
}
