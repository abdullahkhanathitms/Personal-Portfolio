const WORDS = [
  'RESPONSIVE',
  'OPTIMIZED',
  'SEO-FRIENDLY',
  'PIXEL-PERFECT',
  'FAST-LOADING',
  'RELIABLE',
  'USER-FRIENDLY',
  'CONVERSION-READY',
]

function MarqueeGroup() {
  return (
    <div className="marquee-group" aria-hidden="true">
      {WORDS.map((word) => (
        <span className="marquee-item" key={word}>
          <span className="marquee-word">{word}</span>
          <i className="fa-solid fa-star marquee-star"></i>
        </span>
      ))}
    </div>
  )
}

export default function MarqueeBand() {
  return (
    <div className="marquee-section" aria-label="Optimized, Responsive, Reliable and more">
      <div className="marquee-band">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
    </div>
  )
}
