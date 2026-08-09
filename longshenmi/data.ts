import type { ProjectCaseMeta, ShowcaseItem } from '../src/components/ProjectCasePage'

export const projectMeta: ProjectCaseMeta = {
  title: '龙参米',
  typeLabel: '项目类型',
  typeDetails: ['包装设计'],
  descriptionZh: [
    '龙参米大米礼盒包装设计，灵感取自传统农家谷仓，提炼粮仓圆润柔和的轮廓，简化成上下分截的瓶型，质朴又有东方田园氛围感。 瓶身搭配清瘦瘦金体文案，娓娓道来产地与种植工艺，红白印章点缀增添国风质感。大小双瓶规格适配送礼场景，整体素雅简约，传递自然原生的稻米本味',
  ],
  descriptionEn: [
    'Packaging Design for Longshen Rice Gift Box Inspired by traditional farm granaries, the design refines the soft, rounded silhouette of granaries and simplifies it into a two-section bottle shape, embodying rustic charm with an oriental pastoral vibe. Slender thin-gold calligraphy texts on the bottle narrate the origin and planting techniques, while red-and-white seal accents enrich the traditional Chinese aesthetic. Available in two sizes for gifting occasions, the plain and minimalist design delivers the natural original flavor of rice.',
  ],
}

export const showcase: ShowcaseItem[] = [
  { type: 'image', src: '/assets/projects/longshenmi/06.jpg', alt: '龙参米包装 06' },
  { type: 'image', src: '/assets/projects/longshenmi/12.jpg', alt: '龙参米包装 12' },
  { type: 'image', src: '/assets/projects/longshenmi/14.jpg', alt: '龙参米包装 14' },
  { type: 'image', src: '/assets/projects/longshenmi/15.jpg', alt: '龙参米包装 15' },
  { type: 'image', src: '/assets/projects/longshenmi/16.jpg', alt: '龙参米包装 16' },
  { type: 'image', src: '/assets/projects/longshenmi/17.jpg', alt: '龙参米包装 17' },
  { type: 'image', src: '/assets/projects/longshenmi/18.jpg', alt: '龙参米包装 18' },
  { type: 'image', src: '/assets/projects/longshenmi/19.jpg', alt: '龙参米包装 19' },
]

export const ROUTE_PATH = '/projects/longshenmi'
