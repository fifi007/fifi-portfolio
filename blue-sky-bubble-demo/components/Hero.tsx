const ASSET = '/assets/projects/blue-sky-bubble-demo'

export function Hero() {
  return (
    <section className="bsb-hero" aria-label="Hero">
      <div className="bsb-hero__slogan">
        <img
          src={`${ASSET}/slogan.svg`}
          alt=""
          width={611}
          height={459}
          className="bsb-hero__slogan-img"
        />
      </div>
    </section>
  )
}
