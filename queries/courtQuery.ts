import request, { gql } from "graphql-request";

import { allCourts } from "./courtData/all"


export function id2courtName(id: string): string {
  const court = allCourts.find(court => court.id === id)
  return court ? court.name : "Unknown court"
}

const getIndividualCourtQuery = gql`
  query getIndividualCourtQuery ($courtID: ID!) {
    policyUpdates (where: {id: $courtID}) {
      subcourtID
      policy
      contractAddress    
    }
  }
`;