import React from 'react'

const SvgComponent = props => (
  <svg
    className="logo__triangle logo__triangle--right"
    viewBox="217 167 106 96"
    style={{
      isolation: 'isolate'
    }}
    {...props}
  >
    <path d="M220 260l50-90 50 90H220z" vectorEffect="non-scaling-stroke" />
  </svg>
)

export default SvgComponent
