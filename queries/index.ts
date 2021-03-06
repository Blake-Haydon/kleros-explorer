import { ethers } from "ethers";

export const GRAPH_ENDPOINT = "https://api.thegraph.com/subgraphs/name/salgozino/klerosboard"
export const COINGECKO_ENDPOINT = "https://api.coingecko.com/api/v3/"
export const IPFS_ENDPOINT = "https://ipfs.kleros.io/"

export const ALCHEMY_ENDPOINT = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
export const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_ENDPOINT);

export const PNK_DECIMALS = 18  // Number of decimals of precision for the PNK erc20 token
export const PNK_CONTRACT_ADDRESS = "0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d"