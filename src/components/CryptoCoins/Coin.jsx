import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/coin.css'


const Coin = ({ name, image, id, symbol, price, marketCap, priceChange, volume }) => {
  const navigate = useNavigate()

  return (
    <div className='coin-container'>
        <div className='coin-row'>
            <div className='coin'>
                <img src={image} alt="crypto" />
                <h1 className='cursor-pointer' onClick={() => navigate("/crypto-list/" + id)}>{name}</h1>
                <p className='coin-symbol'>{symbol}</p>
            </div>
            <div className="coin-data">
                <p className="coin-price">${price}</p>
                <p className="coin-volume">${volume.toLocaleString()}</p>
                {priceChange < 0 ? (
                    <p className="coin-percent text-red-600">{priceChange.toFixed(2)}%</p>
                ) : (
                    <p className="coin-percent text-green-500">{priceChange.toFixed(2)}%</p>
                )}
                <p className="coin-marketcap">
                    Mkt Cap: ${marketCap.toLocaleString()}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Coin