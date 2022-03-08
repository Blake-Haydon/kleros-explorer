import { GRAPH_ENDPOINT } from '.'
import { request, gql } from 'graphql-request'
import { ethers } from 'ethers'

interface IJuror {
  id: string;
}

const getAllJurorAddressesQuery = gql`
  query getAllJurorAddresses ($skipJurors: Int!) {
    jurors (skip: $skipJurors, first: 1000, orderBy: id, orderDirection: asc) {
      id
    }
  }
`;

const individualJurorQuery = gql`
  query getIndividualJuror ($address: ID!) {
    jurors (where: {id: $address}) {
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

/** Get all Kleros Juror addresses from The Graph */
export const getAllJurorAddresses = async (): Promise<string[]> => {
  // TODO: FIX THIS TYPE
  let jurorAddresses: string[] = []
  let skipJurors = 0

  // Paginate through all jurors
  while (true) {
    const variables = { skipJurors }
    const res = await request(GRAPH_ENDPOINT, getAllJurorAddressesQuery, variables)
    if (Object.entries(res.jurors).length === 0) { break }
    else {
      jurorAddresses = jurorAddresses.concat(
        res.jurors.map((juror: IJuror) => juror.id)
      )
      skipJurors += res.jurors.length
    }
  }

  return Promise.resolve(jurorAddresses)
};

export const getIndividualJurorInfo = async (address: string) => {
  // Sanity check for valid ethereum address before expensive query
  if (!ethers.utils.isAddress(address)) {
    throw TypeError("not a valid ethereum address");
  }

  const variables = { address }
  return request(GRAPH_ENDPOINT, individualJurorQuery, variables)
}