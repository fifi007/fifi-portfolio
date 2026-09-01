export interface ShowcaseImage {
  src: string
  alt: string
}

/** Showcase order: Frame 221 2 → Frame 220 1 → 1 → 2 → 3 */
export const showcaseImages: ShowcaseImage[] = [
  {
    src: '/assets/projects/jxiaozhi/frame-221-2.jpg',
    alt: 'Jxiaozhi 交互界面延展',
  },
  {
    src: '/assets/projects/jxiaozhi/frame-220-1.jpg',
    alt: 'Jxiaozhi 积分管家与转账场景界面',
  },
  {
    src: '/assets/projects/jxiaozhi/1.jpg',
    alt: '银行智能助手用户画像概览',
  },
  {
    src: '/assets/projects/jxiaozhi/2.jpg',
    alt: '竞品矩阵与设计要点',
  },
  {
    src: '/assets/projects/jxiaozhi/3.jpg',
    alt: '核心场景用户流程与设计原则',
  },
]

export const projectMeta = {
  title: 'G小智金融智能助手',
  typeLabel: '项目类型',
  type: 'G行APP',
  roleLabel: '职责',
  roles: ['用户研究', '交互设计', '界面设计', '体验验收'],
  descriptionZh: [
    '近年来AI客服已走进大众的生活，去年我们为G行构建金融智能助手解决方案，帮助银行快速搭建智能客服平台。作为UX组长，我定义了用户研究分析与UX设计策略，并为项目制定了的用户旅程策略与转账汇款工作流程',
  ],
  descriptionEn: [
    'In recent years, AI‑powered customer service has become part of everyday life. Last year, our team built a financial intelligent assistant solution for Bank G, enabling the bank to rapidly deploy its intelligent customer‑service platform. As the UX Lead, I defined user research analysis and UX design strategies, and formulated the user‑journey framework as well as the workflow for fund transfer and remittance for this project.',
  ],
}

export const criticalImages = showcaseImages.slice(0, 1).map((image) => image.src)

export const ROUTE_PATH = '/projects/jxiaozhi'
