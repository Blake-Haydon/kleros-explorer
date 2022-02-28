import { GRAPH_ENDPOINT } from '.'
import { request, gql } from 'graphql-request'

const query = gql`
  query IndexQuery ($numJurors: Int!, $numDisputes: Int!) {
    jurors (orderBy: totalStaked, orderDirection: desc, first: $numJurors) {
      id
      totalStaked
    }

    disputes(orderBy: disputeID, orderDirection: desc, first: $numDisputes) {
      id
    }

    klerosCounters {
      disputesCount
      activeJurors
      tokenStaked
    }  
  }
`

export interface IIndexQuery {
  jurors: {
    id: string;
    totalStaked: number;
  }[];
  disputes: {
    id: string;
  }[];
  disputesCount: number;
  activeJurors: number;
  tokenStaked: number;
}

export const indexQuery = async (numJurors: number, numDisputes: number): Promise<IIndexQuery> => {
  const variables = { numJurors, numDisputes }
  return request(GRAPH_ENDPOINT, query, variables)
    .then(res => {
      return {
        ...res,
        // @ts-ignore TODO: FIX THOSE TYPES
        jurors: res.jurors.map(juror => ({
          ...juror,
          totalStaked: parseInt(juror.totalStaked),
        })),
        disputesCount: parseInt(res.klerosCounters[0].disputesCount),
        activeJurors: parseInt(res.klerosCounters[0].activeJurors),
        tokenStaked: parseInt(res.klerosCounters[0].tokenStaked),
      }
    })
}