import type { ProjectCaseMeta, ShowcaseItem } from '../src/components/ProjectCasePage'

export const projectMeta: ProjectCaseMeta = {
  title: 'FAB(finagent booster)_ 金融智能体加速器',
  typeLabel: '项目类型',
  typeDetails: ['公有云官网上线'],
  roleLabel: '职责',
  roles: ['用户界面设计', '动效设计', 'banner设计', '体验验收'],
  descriptionZh: [
    '2026年，华为上线”金融智能体加速器FAB（FinAgent Booster）”，该平台聚焦手机银行、风控信贷等核心场景，通过预置50+场景工作流与150+金融MCP工具，让智能体应用开发从数月缩短至数周，加速AI在金融行业的商业落地。作为UX设计师，我独立为30+核心场景设计了首页banner，并且定义了交互动效设计，获得客户的一致好评。',
  ],
  descriptionEn: [
    'In 2026, Huawei launched the FinAgent Booster (FAB), a financial agent accelerator. Centered on core scenarios including mobile banking, risk control and credit services, the platform comes with over 50 pre-built scenario workflows and more than 150 financial MCP tools. It cuts the development cycle of agent-based applications from months to weeks, accelerating the commercial rollout of AI across the financial industry. As a UX Designer, I independently designed homepage banners for over 30 core scenarios and standardized interactive motion design, which earned unanimous positive feedback from clients',
  ],
}

/** Figma order: 视频占位_1/2 → grid 8|2 → shuju|cube → 反欺诈|6 → skill|知识 → 创新|earth */
export const showcase: ShowcaseItem[] = [
  {
    type: 'video',
    src: '/assets/projects/fab/1.mp4',
    alt: '一站式金融智能体开发平台',
  },
  {
    type: 'video',
    src: '/assets/projects/fab/2.mp4',
    alt: '贷后风险监控',
  },
  {
    type: 'grid',
    label: '部分主视觉设计',
    items: [
      { type: 'image', src: '/assets/projects/fab/8-1.jpg', alt: 'banner 8' },
      { type: 'image', src: '/assets/projects/fab/2-23.jpg', alt: 'banner 2' },
      { type: 'image', src: '/assets/projects/fab/shuju1-1.jpg', alt: '数据 banner' },
      { type: 'image', src: '/assets/projects/fab/cube.jpg', alt: 'cube banner' },
      { type: 'image', src: '/assets/projects/fab/anti-fraud-1.jpg', alt: '反欺诈 banner' },
      { type: 'image', src: '/assets/projects/fab/6-1.jpg', alt: 'banner 6' },
      { type: 'image', src: '/assets/projects/fab/skill-1.jpg', alt: 'skill banner' },
      { type: 'image', src: '/assets/projects/fab/knowledge-1.jpg', alt: '知识 banner' },
      { type: 'image', src: '/assets/projects/fab/innovation-1.jpg', alt: '创新 banner' },
      { type: 'image', src: '/assets/projects/fab/earth-1.jpg', alt: 'earth banner' },
    ],
  },
]

export const ROUTE_PATH = '/projects/fab'
