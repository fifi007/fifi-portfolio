import type { ProjectCaseMeta, ShowcaseItem } from '../src/components/ProjectCasePage'

export const projectMeta: ProjectCaseMeta = {
  title: '壹贰叁造型',
  typeLabel: '项目类型',
  typeDetails: ['logo设计', '字体设计'],
  descriptionZh: [
    '“壹贰叁造型”门店扎根南方滨海小城，日常伴着碧海蓝天与咸柔海风，123 不只是简单数字，更是按下快门定格发型美感的暗号！ 选择这种像“小积木”一样的方块字，方方正正的，其实藏着海边吹来的清爽气息呢，繁体版作为主Logo，数字版“123”作为辅助图形。既能保留数字的轻松记忆点，保证了主品牌标志在任何场景下都清晰百搭',
  ],
  descriptionEn: [
    'Rooted in a cozy southern coastal town, "壹贰叁造型" (One Two Three Styling) is a salon surrounded by blue skies, azure seas, and soft, salty sea breezes. For us, "123" isn\'t just a simple count—it\'s the secret cue for pressing the shutter and freezing that perfect hair moment! I chose these square, blocky Chinese characters that look like "little building blocks." Despite their rigid, neat shape, they subtly hold the refreshing vibe of the seaside. We use the traditional Chinese version as our main Logo, while the numeric "123" works as a supporting graphic. This clever combo keeps the fun, easy-to-remember appeal of the numbers, while ensuring the primary brand mark stays crystal clear and perfectly versatile across any scenario.',
  ],
}

export const showcase: ShowcaseItem[] = [
  { type: 'image', src: '/assets/projects/123/group-16.jpg', alt: '壹贰叁主 Logo' },
  { type: 'image', src: '/assets/projects/123/group-25.jpg', alt: '单色 logo 与辅助图形' },
  { type: 'image', src: '/assets/projects/123/mask-group.jpg', alt: '壹贰叁应用场景' },
  { type: 'image', src: '/assets/projects/123/group-26.jpg', alt: '壹贰叁品牌延展' },
  { type: 'image', src: '/assets/projects/123/mask-group-1.jpg', alt: '帆布袋应用' },
]

export const ROUTE_PATH = '/projects/123'
