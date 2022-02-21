import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

import CoinGraph from '../../components/CryptoCoins/DetailedView/Graph/CoinGraph'
import '../../styles/detailedView.css'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GetCoinData = async (id, setCoin, setError) => {
  /* fetch info */
  try {
    /* https://www.coingecko.com/ */
    const resp = await axios.get("https://api.coingecko.com/api/v3/coins/" + id)
    
    setCoin(resp.data)
  } catch(err) {
    console.log(err)
    setError(err)
  }
}

const GetCoinHistoryData = async (id, currency, period, setHistory, setError) => {
  let current_date = new Date().getTime() / 1000
  const day = 86400
  let from

  if (period === "24h"){
    from = day
  }
  else if (period ==="7d") {
    from = day * 7
  }
  else if (period ==="14d") {
    from = day * 14
  }
  else if (period ==="30d") {
    from = day * 30
  }

  /* fetch graph */
  /* 
  Data granularity is automatic (cannot be adjusted)
  1 day from query time = 5 minute interval data
  1 - 90 days from query time = hourly data
  above 90 days from query time = daily data (00:00 UTC)
 */
  try {
    /* https://www.coingecko.com/ */
    const resp = await axios.get("https://api.coingecko.com/api/v3/coins/" + id + "/market_chart/range?"
    + "vs_currency=" + currency 
    + "&from=" + (current_date - from)
    + "&to=" + current_date)

    setHistory(resp.data)
  } catch(err) {
    console.log(err)
    setError(err)
  }
}

export default function DetailedView() {
  const [coin, setCoin] = useState([])
  const [history, setHistory] = useState([])

  const [error, setError] = useState('')

  const [period, setPeriod] = useState("24h")

  const currency = ["usd", "$"]

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
      GetCoinData(id, setCoin, setError)
  }, [id])

  useEffect(() => {
    GetCoinHistoryData(id, currency[0], period, setHistory, setError)
  }, [id, period])

  if (coin.length === 0) {
    return (
      <div className='min-h-[91vh] text-white flex flex-col justify-center items-center'>
        {error ? <h2>Coin not found! <Link to={"/crypto-list"}>Go back</Link></h2> : <CircularProgress />}
      </div>
    )
  }
  else {
    return (
      <div className='flex justify-center items-center flex-col min-h-[91vh] text-white'>
        <div className='absolute top-[75px] left-5'>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-3 rounded inline-flex items-center"
                  onClick={() => navigate("/crypto-list")}>
            <ArrowBackIcon />
            <span>Back</span>
          </button>

          <div className='flex flex-row'>
            <img src={coin.image && coin.image.small} alt="crypto" />
            <h1 className='ml-2'>{coin.name}</h1>
          </div>
        </div>

        {/* graph */}
        <div className='flex flex-col justify-center items-center w-full mt-12 text-black'>
          <DataSelector period={period} setPeriod={setPeriod} />
          <div className='flex justify-center items-center w-[90%] h-[500px] m-8'>
            <CoinGraph history={history} symbol={currency[1]}/> {/* !TODO change to currency simblo after */}
          </div>
        </div>
      
      </div>
    )
  }
}

function DataSelector({ period, setPeriod }) {
  const handleChange = (event, period) => {
    if (period !== null) {
      setPeriod(period)
    }
  };

  const control = {
    value: period,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <div className="flex items-center justify-center">
        <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
          <ToggleButtonGroup size="small" {...control}>
          <ToggleButton value="24h" className="day-btn" color={"info"}>
            24h
          </ToggleButton>
          <ToggleButton value="7d" className="day-btn" color={"info"}>
            7d
          </ToggleButton>
          <ToggleButton value="14d" className="day-btn" color={"info"}>
            14d
          </ToggleButton>
          <ToggleButton value="30d" className="day-btn" color={"info"}>
            30d
          </ToggleButton>
          </ToggleButtonGroup>
        </div>
    </div>
  )
}