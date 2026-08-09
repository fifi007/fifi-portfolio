import { ProjectCasePage } from '../src/components/ProjectCasePage'
import { projectMeta, showcase } from './data'

export function CradleBabyPage() {
  return (
    <ProjectCasePage
      meta={projectMeta}
      showcase={showcase}
      ariaLabel="CradleBaby project intro"
    />
  )
}
