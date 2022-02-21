import React from 'react'
import moment from 'moment'

export default function CustomTooltip({ symbol, active, payload, label}) {
  if (active) {
    return (
      <div className='rounded bg-[#26313c] text-white p-1 shadow-[15px_30px_40px_5px_rgba(0, 0, 0, 0.5)] text-center'>
        <h5>{moment(label).format('ddd Do MMM YYYY, hh:mm:ss')}</h5>
        <p>
          Price: {symbol + (payload[0].value).toFixed(4)}
        </p>
      </div>
    )
  }
  return null
}
