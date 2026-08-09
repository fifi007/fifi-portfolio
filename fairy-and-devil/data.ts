import type { ProjectCaseMeta, ShowcaseItem } from '../src/components/ProjectCasePage'

export const projectMeta: ProjectCaseMeta = {
  title: '六城联动｜苍兰 CP 生日线下大屏视觉设计',
  typeLabel: '项目类型',
  typeDetails: ['视觉设计'],
  roleLabel: '职责',
  roles: ['海报设计', '视频剪辑'],
  descriptionZh: [
    '自《苍兰诀》播出收获超高热度，我收到粉丝们的需求，为虞书欣&王鹤棣设计定制生日海报，作品现已在北京、上海、广州、深圳、成都、大连等城市中心大屏轮播展示',
  ],
  descriptionEn: [
    'After the huge hit of Love Between Fairy and Devil, I received requests from fans to create custom birthday posters for Esther Yu and Dylan Wang. These artworks are now displayed on large screens in downtown areas of Beijing, Shanghai, Guangzhou, Shenzhen, Chengdu and Dalian on a rolling basis.',
  ],
}

export const showcase: ShowcaseItem[] = [
  {
    type: 'image',
    src: '/assets/projects/fairy-and-devil/poster.jpg',
    alt: '苍兰 CP 生日大屏视觉',
  },
]

export const ROUTE_PATH = '/projects/fairy-devil'
