import type { ProjectCaseMeta, ShowcaseItem } from '../src/components/ProjectCasePage'

export const projectMeta: ProjectCaseMeta = {
  title: 'FAGILI',
  typeLabel: '项目类型',
  typeDetails: ['品牌推广'],
  roleLabel: '职责',
  roles: ['用户界面设计', '动效设计', '产品图'],
  descriptionZh: [
    'FAGILI用马卡龙色系和简单可爱的设计，重新定义儿童智能台灯，，让每一处细节都传递出温暖、安全与童趣，陪伴孩子快乐成长。作为设计主管，我主导完成了从产品拍摄到网页、App、动态Logo等全链路设计',
  ],
  descriptionEn: [
    'FAGILI redefines smart desk lamps for children with macaron color palettes and simple, adorable designs. Every detail conveys warmth, safety and childlike fun, accompanying kids as they grow happily. As Lead Designer, I led the full-cycle design covering product photography, web pages, mobile apps and animated logos.',
  ],
}

/** Figma order: Group 15 → logo → Group 28 → Mask groups → 视频占位_ipad 2 */
export const showcase: ShowcaseItem[] = [
  {
    type: 'image',
    src: '/assets/projects/fagili/group-15.jpg',
    alt: 'FAGILI Smart Light',
  },
  {
    type: 'image',
    src: '/assets/projects/fagili/fagili-logo.gif',
    alt: 'FAGILI logo',
  },
  {
    type: 'image',
    src: '/assets/projects/fagili/group-28.jpg',
    alt: 'FAGILI product',
  },
  {
    type: 'image',
    src: '/assets/projects/fagili/mask-group.jpg',
    alt: 'FAGILI app screens',
  },
  {
    type: 'image',
    src: '/assets/projects/fagili/mask-group-1.jpg',
    alt: 'FAGILI mobile UI',
  },
  {
    type: 'video',
    src: '/assets/projects/fagili/ipad-2.mp4',
    alt: 'FAGILI iPad demo',
  },
]

export const ROUTE_PATH = '/projects/fagili'
