import React from 'react'
import "./Donut.css"

const Donut = ({percent = 0, size = 300, stroke = 12}) => {
    const p = Math.max(0, Math.min(100, Number(percent) || 0))
    const r = (size - stroke) / 2
    const C = 2 * Math.PI * r
    const dash = (p / 100) * C
  return (
    <div className='donut-wrap' role='img' aria-label={`${p}%`}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <g transfrom={`rotate(-90 ${size/2} ${size/2})`}>
            <circle className='donut-track' cx={size/2} cy={size/2} r={r}
            strokeWidth={stroke} fill='none'/>
            <circle className='donut-arc' cx={size/2} cy={size/2} r={r}
            strokeWidth={stroke} fill='none'
            strokeDasharray={`${dash} ${C-dash}`}
            strokeLinecap='butt' />
            </g>
            </svg>
            <div className="donut-label">{p}%</div>
      
    </div>
  )
}

export default Donut
