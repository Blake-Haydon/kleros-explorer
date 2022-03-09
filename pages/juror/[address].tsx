import type { NextPage } from 'next'

import { getAllJurorAddresses, getIndividualJurorInfo } from '../../queries/jurorQuery'

import Header from '../../components/header';
import Heading from '../../components/heading';


export async function getStaticPaths() {
  // Do not run slow query while in dev mode
  if (process.env.NODE_ENV === 'development') { return { paths: [], fallback: 'blocking' } }

  // In production, find all juror addresses to generate static paths
  const jurorAddresses = await getAllJurorAddresses()
  return {
    paths: jurorAddresses.map(jurorAddress => ({
      params: { address: jurorAddress }
    })),
    fallback: 'blocking',  // Render the page in full if it has not been rendered before
  };
}

export async function getStaticProps(context: { params: { address: string } }) {
  const address = context.params.address
  // TODO: add ENS support
  // const name = await provider.lookupAddress(address);
  return getIndividualJurorInfo(address)
    .then(res => {
      return {
        props: { address: address, otherData: res },
        revalidate: 60 * 60, // An hour in seconds
      }
    })
    .catch(_ => {
      return { notFound: true }
    })
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