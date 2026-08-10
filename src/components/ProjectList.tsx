import { motion } from 'framer-motion'
import type { Project } from '../data/types'
import { SmartImage } from './SmartImage'
import './ProjectList.css'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <motion.a
          key={project.id}
          href={project.href ?? `#${project.id}`}
          className="list-card"
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: index * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ y: -4 }}
        >
          <SmartImage
            src={project.listImage}
            alt={project.title}
            className="list-card__image"
            loading={index < 4 ? 'eager' : 'lazy'}
          />
        </motion.a>
      ))}
    </div>
  )
}
