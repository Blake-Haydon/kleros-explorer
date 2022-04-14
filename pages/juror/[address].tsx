import type { NextPage } from 'next'

import { getIndividualJurorInfo } from '../../queries/jurorQuery'

import Header from '../../components/header';
import Heading from '../../components/heading';


export async function getServerSideProps(context: { params: { address: string } }) {
  const address = context.params.address
  // TODO: add ENS support
  // const name = await provider.lookupAddress(address);

  try {
    const res = await getIndividualJurorInfo(address);
    const props = {
      address: address,
      otherData: res,
    }
    return { props }
  } catch (error) {
    return { notFound: true }
  }
}

const JurorPage: NextPage<{ address: string, otherData: any }> = ({ address, otherData }) => {

  return (
    <div>
      <Header />
      <main className="container">
        <Heading />

        <p>Juror: {address}</p>
        <p>{JSON.stringify(otherData)}</p>
        <div>

          <button
            type="button"
            className="btn btn-outline-danger me-2"
            title="Chat to Juror"
            onClick={() => parent.open(`https://chat.blockscan.com/index?a=${address}`)}
          >
            <i className="bi bi-chat-heart-fill" />
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            title="View in Etherscan"
            onClick={() => parent.open(`https://etherscan.io/address/${address}`)}
          >
            <i className="bi bi-info-circle-fill" />
          </button>

        </div>
      </main>

    </div>
  )
}

export default JurorPage