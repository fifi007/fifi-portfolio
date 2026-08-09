import type { ProjectCaseMeta, ShowcaseItem } from '../src/components/ProjectCasePage'

export const projectMeta: ProjectCaseMeta = {
  title: 'OVF｜肌本法则',
  typeLabel: '项目类型',
  typeDetails: ['品牌升级'],
  roleLabel: '职责',
  roles: ['logo设计', '包装设计'],
  descriptionZh: [
    '护肤应当真实、有效——这正是OVF（one vital formula）品牌创立的初衷。不追逐转瞬即逝的潮流，也不做浮夸失实的承诺，始终专注于一件事：提供真正起效的护肤方案。每一款配方都源自实验室严谨研发，精准回应肌肤的真实需求。 护肤行业总喜欢把护肤变得繁复难懂，而OVF的产品配方成分始终清晰直白。 品牌核心理念，即是剔除一切冗余，回归高效本质。依托科学研发成果，秉持简约务实的设计语言，搭配一目了然的产品命名——核心有效成分直接标注于瓶身，让每个人都能轻松看懂、准确选择，从而搭建起真正适合自己肤质的日常护理流程。',
  ],
  descriptionEn: [
    "Skincare should be authentic and effective—this is the founding principle behind OVF (one vital formula). We don't chase fleeting trends or make exaggerated, empty promises. Instead, we stay focused on one thing: delivering skincare solutions that truly work. Every formula is rigorously developed in the lab, precisely tailored to meet the real needs of your skin. The skincare industry often complicates what should be simple. At OVF, our product ingredients are always clear, straightforward, and free of ambiguity. Our core philosophy is to strip away all redundancy and get back to the essence of efficiency. Grounded in scientific research, we embrace a simple, practical design language and product names that speak for themselves—key active ingredients are clearly stated right on the label. This way, everyone can easily understand and make the right choices, building a daily skincare routine that truly fits their own skin type.",
  ],
}

export const showcase: ShowcaseItem[] = [
  { type: 'image', src: '/assets/projects/ovf/1196.jpg', alt: 'OVF brand visual' },
  { type: 'image', src: '/assets/projects/ovf/ovf12345.jpg', alt: 'OVF packaging' },
  { type: 'image', src: '/assets/projects/ovf/ovf1-2025.jpg', alt: 'OVF product' },
]

export const ROUTE_PATH = '/projects/ovf'
