import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from '../../components/CryptoCoins/Coin'

import '../../styles/cryptoList.css'

import CircularProgress from '@mui/material/CircularProgress';
/* import Pagination from '@mui/material/Pagination'; */

export default function CryptoList() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  /* pages */
  /* const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    if (page !== value) {
      document.documentElement.scrollTop = 0
      setPage(value);
    }
  }; */

  useEffect(() => {
    /* https://www.coingecko.com/ */
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=250&page=1&sparkline=false")
    .then(res => {
      setCoins(res.data)
      console.log(res.data)
    })
    .catch(error => console.log(error))
  }, []) // page - update on page if there will be pages 

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a currency</h1>
          <form action="">
            <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
          </form>
        </div>
      {/* <h2 className='mb-4'>Page: {page}</h2> */}
      <div className="coin-row">
        <p className="w-[30%] ml-16 ">Coin</p>
        <p className="w-[13%]">Price</p>
        <p className="w-[21%]">24h Volume</p>
        <p className="w-[15%]">24h</p>
        <p>Mkt Cap</p>
      </div>

      <ShowData coins={coins} filteredCoins={filteredCoins} />

      {/* <div className='pages'>
        <Pagination linksColor='secondary' count={20} page={page} onChange={handlePageChange} />
      </div> */}
    </div>
  )
}

function ShowData(props) {
  if (!props.coins.length === 0) {
    /* loading screen until data arrives */
    return (
        <CircularProgress className='mt-16 text-blue-500'/>
    )
  }
  else {
    /* print the coins */
    return (
      props.filteredCoins.map(coin => 
          <Coin key={coin.id}
                name={coin.name}
                image={coin.image}
                id={coin.id}
                symbol={coin.symbol}
                marketCap={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume} />
      )
    )
  }
}