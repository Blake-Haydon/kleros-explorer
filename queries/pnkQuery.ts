import { COINGECKO_ENDPOINT } from "."
import axios from "axios"

export interface IPnkQuery {
  circulatingSupply: number;
  priceUSD: number;
}

export const pnkQuery = async (): Promise<IPnkQuery> => {
  return axios.get(COINGECKO_ENDPOINT + 'coins/kleros', {
    params: {
      market_data: true,
      localization: "en",
      tickers: false,
      community_data: false,
      developer_data: false,
      sparkline: false,
    }
  }).then(res => (
    {
      circulatingSupply: parseFloat(res.data.market_data.circulating_supply),
      priceUSD: parseFloat(res.data.market_data.current_price.usd),
    }
  ))
}

