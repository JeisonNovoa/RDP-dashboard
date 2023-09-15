// miWorker.js
function mapper_coin(data) {
    let rubber_to_coin = {
      coin_id: 7,
      coin_rank: parseInt(data.coingecko_rank),
      coin_Name: data.name,
      coin_slug: data.id,
      coin_symbol: data.symbol,
      coin_address: data.contract_address,
      circulatingSupply: parseInt(data.market_data.circulating_supply),
      totalSupply: parseInt(data.market_data.total_supply),
      maxSupply: parseInt(data.market_data.max_supply)
    };
    return rubber_to_coin
  }
  
  function geeko_shaped_data_bigtime() {
    var Time = 1810000;
    url =
      'https://api.coingecko.com/api/v3/coins/spacelens/?localization=true&tickers=true&community_data=true&developer_data=true&vs_currency=usd,eth,btc,matic';
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(function(value) {
        let msg = mapper_coin(value)
        postMessage(msg)
      })
      .catch(function(error) {
        console.error('Error:', error) 
      })
      .finally(function() {
        setTimeout(geeko_shaped_data_bigtime, Time);
      });
  }
  
  geeko_shaped_data_bigtime();
  