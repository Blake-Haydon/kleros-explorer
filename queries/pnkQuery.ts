import { COINGECKO_ENDPOINT, PNK_DECIMALS } from "."
import axios from "axios"

export const pnkFormat = (numTokens: number, decimals: number = 0): string => {
  const locale = "en-US"
  const options = {
    maximumFractionDigits: decimals
  }

  // Convert integer number of PNK to decimal version
  const decimalPNK = numTokens * (10 ** PNK_DECIMALS)
  return decimalPNK.toLocaleString(locale, options)
}

export const pnkQuery = async () => {
  return axios.get(COINGECKO_ENDPOINT + 'coins/kleros', {
    params: {
      market_data: true,
      localization: "en",
      tickers: false,
      community_data: false,
      developer_data: false,
      sparkline: false,
    }
  }).then(res => {
    return {
      circulatingSupply: parseFloat(res.data.market_data.circulating_supply),
      priceUSD: parseFloat(res.data.market_data.current_price.usd),
    }
  })
}

