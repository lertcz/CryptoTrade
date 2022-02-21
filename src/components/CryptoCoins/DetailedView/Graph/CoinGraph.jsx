import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import CustomTooltip from './CustomTooltip'

export default function CoinGraph({ history, symbol }) {
  let prices = history["prices"]

  const data=[]
  Data(data, prices)
  
  /* const MAX_VAL = Math.max.apply(null, priceList)
  const MIN_VAL = Math.min.apply(null, priceList) */
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}/>
            <stop offset="70%" stopColor="#2451B7" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <Area dataKey="value" stroke='#2451B7' fill="url(#colorUv)" />
        <XAxis 
          dataKey="date" 
          axisLine={false} tickLine={false} tick={false} />
        <YAxis  
          type="number" 
          domain={["0", "dataMax"]} 

          axisLine={false} tickLine={false} tickCount={8}
          tickFormatter={tick => (`${symbol + tick.toFixed(3)}`)}/>
        <Tooltip content={<CustomTooltip symbol={symbol}/>}/>
        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function Data(data, prices) {
  for(let i = 0; i < prices?.length??-1 ; i++) {
    data.push({
      /* date: moment(prices[i][0]).format('YYYY-MM-DD'), */
      date: prices[i][0],
      value: prices[i][1]
    })
  }
}