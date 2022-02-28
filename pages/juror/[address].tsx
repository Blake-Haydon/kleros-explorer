import type { NextPage } from 'next'

import { ethers } from 'ethers'
import { request, gql } from 'graphql-request'
import Link from 'next/link';

// TODO: Move to query folder
import { GRAPH_ENDPOINT } from '../../queries'

const getAllJurorIdsQuery = gql`
  query getAllJurorIds ($skipJurors: Int!) {
    jurors (skip: $skipJurors, first: 1000, orderBy: id, orderDirection: asc) {
      id
    }
  }
`;

const individualJurorQuery = gql`
  query getIndividualJuror ($id: ID!) {
    jurors (where: {id: $id}) {
      id
      totalStaked
      currentStakes {
        stake
        court {
          id
        }
      }
    }
  }
`;

export async function getStaticPaths() {
  // Do not run slow query while in dev mode
  if (process.env.NODE_ENV === 'development') {
    return {
      paths: [],
      fallback: true,
    }
  }

  // Get all juror addresses from the graph endpoint
  let skipJurors = 0

  // TODO: FIX THIS TYPE
  let jurorAddresses: { params: { address: string } }[] = []
  while (true) {
    const variables = { skipJurors: skipJurors }
    const res = await request(GRAPH_ENDPOINT, getAllJurorIdsQuery, variables)

    // Check if the data object is empty
    if (Object.entries(res.jurors).length === 0) {
      break
    } else {
      jurorAddresses = jurorAddresses.concat(
        res.jurors.map(
          (juror: { id: any }) => ({ params: { address: juror.id } })
        )
      )
      skipJurors += res.jurors.length
    }
  }

  // Add newline for correct printing with `yarn build`
  // console.info(`\nFound ${jurorAddresses.length} juror addresses`)
  return {
    paths: jurorAddresses,
    fallback: true,  // Render the page if it has not been rendered before
  };
}

export async function getStaticProps(context: { params: { address: string } }) {
  // Validate address is a valid ethereum address
  const address = context.params.address;
  if (ethers.utils.isAddress(address)) {
    const variables = { id: address }
    const res = await request(GRAPH_ENDPOINT, individualJurorQuery, variables)

    return {
      props: { address: address, otherData: res },
      revalidate: 60 * 60, // An hour in seconds
    }
  } else {
    return { notFound: true }
  }
}

const JurorPage: NextPage<{ address: string, otherData: any }> = ({ address, otherData }) => {
  return (
    <div>
      <main className="container">
        <div className="row my-5">
          <div className="col">
            <Link href="/" passHref>
              <h1 className="home-heading">Kleros Explorer</h1>
            </Link>
          </div>
        </div>

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