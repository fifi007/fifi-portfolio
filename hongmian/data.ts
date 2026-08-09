export interface ShowcaseImage {
  src: string
  alt: string
}

/** Figma node 151:216 — 效果图竖版_展开_ */
export const showcaseImages: ShowcaseImage[] = [
  {
    src: '/assets/projects/hongmian/hongmian.jpg',
    alt: '红棉黑糖包装效果图',
  },
]

export const projectMeta = {
  title: '红棉黑糖',
  typeLabel: '项目类型',
  type: '包装设计',
  descriptionZh: [
    '2024 年末我接到了广州本土龙头企业红棉的包装设计委托，它同时也是山姆的合作代工厂，实力底蕴十分深厚。他们这次想为女性做一款经期专属的黑糖小食。为了贴合这种温暖治愈的调性，我在包装设计上做了“减法”——选择质朴简约的路线，把大大的“黑糖”书法字体作为绝对视觉主角，让人一目了然。包装上那句“古法熬煮，颗颗甜润”，除了描述传统的熬糖工艺，更想传递一种踏实放松的情绪。希望这颗小小的黑糖，真的能在特殊的日子里，悄悄温暖女生们的心房~ 这款包装落地后市场反响十分亮眼，仅天猫超市渠道销量就突破 20 万 +，收获了大量消费者的认可。',
  ],
  descriptionEn: [
    'At the end of 2024, I was entrusted with a packaging design project by Hongmian—a leading local heavyweight in Guangzhou and a co-manufacturer for Sam\'s Club. With their strong industrial heritage, they aimed to create a brown sugar snack specifically tailored for women during their menstrual cycles. To bring out that warm and healing energy, I took a "subtraction" approach in the design: keeping it simple and rustic, with the bold calligraphic characters for "Black Sugar" taking absolute center stage, so the product speaks for itself at a glance. The tagline, "Traditionally simmered, sweet and smooth in every bite," does more than just describe the time-honored craftsmanship—it also wraps the whole experience in a sense of grounded reassurance. I truly hope this little brown sugar cube can quietly warm the hearts of women on those special days~ After hitting the shelves, the packaging gained fantastic market traction. On Tmall Supermarket alone, sales have already surpassed 200,000 units, earning wide recognition and love from consumers along the way!',
  ],
}

export const criticalImages = showcaseImages.map((image) => image.src)

export const ROUTE_PATH = '/projects/hongmian'
