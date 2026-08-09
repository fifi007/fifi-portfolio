const NOISE_SVG = `\
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>\
<filter id='n'>\
<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>\
<feColorMatrix type='saturate' values='0'/>\
</filter>\
<rect width='100%' height='100%' filter='url(%23n)'/>\
</svg>`

const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="bsb-noise"
      style={{
        backgroundImage: NOISE_URL,
        backgroundRepeat: 'repeat',
        backgroundSize: '160px 160px',
      }}
    />
  )
}
