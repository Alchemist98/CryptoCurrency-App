import React, {useEffect, useState} from 'react';
import './App.css';
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  const getCoinData = async () => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

    const res = await fetch(url);

    const resJson = await res.json();

    console.log(resJson);
    setCoins(resJson);
  }

  useEffect(() => {
    getCoinData();
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input 
            type="text" 
            placeholder="Search" 
            className="coin-input" 
            value={search} 
            onChange={handleChange} 
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
            key={coin.id} 
            name={coin.name} 
            price={coin.current_price} 
            image={coin.image} 
            symbol={coin.symbol} 
            volume={coin.market_cap} 
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
