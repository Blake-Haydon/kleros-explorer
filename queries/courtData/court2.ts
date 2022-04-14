import { ICourt } from "./all";


export const court2: ICourt = {
    id: "2",
    name: "Non-Technical",
    description: "This subcourt is for small non-technical blockchain disputes. It is used for disputes on challenged tokens from Kleros Token² Curated Registry Dapp, Cryptoasset Transfer and Exchange Listing agreement escrow disputes. This can include: - **Token² Curated Registry**: A curated list of verified tokens submitted by users. This includes, logo, token name, contract address and ticker. - **Cryptoasset Transfer Escrow**: This escrow can be used by users to safely and securely transfer cryptoassets between two parties, even if one cryptoasset is on a chain other than Ethereum. Funds are locked in a smart contract until the other party has complied with the agreement or a dispute is brought. An example use case could be transferring ETH for BTC P2P without knowledge of the other party. You deposit ETH into the escrow, the other party sends BTC and you release ETH. - **Exchange Listing Agreement Escrow**: This escrow can be used to delegate listing of tokens to token listing agents. A reward is paid to the agent if the token is appropriately listed on the agreed upon exchange. **Example** - Someone submits the PNK token with the address “0x87c260900c391559fd2816c9fbf078de37e2f520”. Someone challenges the listing as incorrect as the real PNK address is “0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d”. - Parties make a contract to exchange 1 BTC for 30 ETH. After the deadline agreed in the contract, the address of the BTC buyer still hasn't been credited. - Contractor agreed to list clients token or coin in both USD and DAI pairings but did not deliver USD.",
};

export default court2;

