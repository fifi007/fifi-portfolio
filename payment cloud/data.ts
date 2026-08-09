export interface ShowcaseImage {
  src: string
  alt: string
}

/** Figma order top → bottom: Group 24 → 23 → 22 → 21 → 20 */
export const showcaseImages: ShowcaseImage[] = [
  {
    src: '/assets/projects/payment-cloud/group-24.jpg',
    alt: '全球云服务专场',
  },
  {
    src: '/assets/projects/payment-cloud/group-23.jpg',
    alt: '一站式集成',
  },
  {
    src: '/assets/projects/payment-cloud/group-22.jpg',
    alt: '全球视野',
  },
  {
    src: '/assets/projects/payment-cloud/group-21.jpg',
    alt: '跨境贸易业务场景',
  },
  {
    src: '/assets/projects/payment-cloud/group-20.jpg',
    alt: 'icon设计',
  },
]

export const projectMeta = {
  title: '华为跨境支付云',
  typeLabel: '项目类型',
  type: '华为云官网设计',
  roleLabel: '职责',
  roles: ['概念原型设计', '用户界面设计', '动效设计', '3D渲染', '体验验收'],
  descriptionZh: [
    '2022年，华为构建电商行业解决方案。为驱动新一轮电子商务产业创新，加快推动企业数字化转型。',
    '[跨境支付云]帮助跨境企业快速搭建跨境贸易电商平台，无缝对接支付、海关、物流等接口服务，帮助跨境企业货买全球，货卖全球。',
    '作为UX组长，我定义并领导了4个以上的工作流程。并为项目制定了的用户体验策略基础。',
  ],
  descriptionEn: [
    "In 2022, Huawei built industry-specific solutions for the e-commerce sector to fuel a new round of innovation in the e-commerce industry and accelerate enterprises' digital transformation.",
    '[Cross-border Payment Cloud] enables cross-border enterprises to rapidly build cross-border e-commerce platforms, with seamless integration of payment, customs, logistics and other interface services, supporting businesses to source and sell goods globally.',
    'As the UX Lead, I defined and led more than four workflows, and established the foundational user experience strategy for the project.',
  ],
}

export const criticalImages = showcaseImages.map((image) => image.src)

export const ROUTE_PATH = '/projects/payment-cloud'
