import type { ProjectCaseMeta, ShowcaseItem } from '../src/components/ProjectCasePage'

export const projectMeta: ProjectCaseMeta = {
  title: '摇篮宝贝婴护系列',
  typeLabel: '项目类型',
  typeDetails: ['包装设计'],
  descriptionZh: [
    '这次给“摇篮宝贝”设计包装，没有用刻板的卡通婴儿元素，而是把成分本身画成了简单的小几何色块——半颗橄榄、芦荟交叠的叶片、飞溅的椰奶和圆润的灵芝。低饱和度的柔雾感色彩，配上米白底色，视觉上就像宝宝肌肤一样软乎乎、很透气。在视觉上留出“呼吸感”，圆润柔和的几何图形弱化尖锐感，贴合婴幼儿温和安全的产品调性，多规格盒型适配全线洗护产品。整体干净素雅，传递天然、亲肤、安心的育儿护肤理念。',
  ],
  descriptionEn: [
    'For the "Cradle Baby" packaging, I decided to step away from rigid, stereotypical cartoon baby illustrations. Instead, I turned the very ingredients into minimalist, geometric color blocks—half an olive, overlapping aloe vera leaves, splashing coconut milk, and a plump lucid ganoderma mushroom. The soft, low-saturation misty hues, paired with a warm off-white backdrop, evoke a tactile sense of baby-soft, breathable skin. By consciously leaving plenty of "breathing space" in the visual layout and using gentle, rounded shapes to avoid any sharpness, the design aligns perfectly with the mild and safe nature of infant care products. With multiple box sizes tailored for the entire product line, the overall look stays clean and understated—quietly delivering a philosophy of natural, skin-friendly, and reassuring baby care.',
  ],
}

/** Figma order by Y: 1 198 → 1 197 → 3 8 → 4 2 → 5 1 */
export const showcase: ShowcaseItem[] = [
  { type: 'image', src: '/assets/projects/cradle-baby/1-198.jpg', alt: '摇篮宝贝包装 1' },
  { type: 'image', src: '/assets/projects/cradle-baby/1-197.jpg', alt: '摇篮宝贝包装 2' },
  { type: 'image', src: '/assets/projects/cradle-baby/3-8.jpg', alt: '摇篮宝贝包装 3' },
  { type: 'image', src: '/assets/projects/cradle-baby/4-2.jpg', alt: '摇篮宝贝包装 4' },
  { type: 'image', src: '/assets/projects/cradle-baby/5-1.jpg', alt: '摇篮宝贝包装 5' },
]

export const ROUTE_PATH = '/projects/cradle-baby'
