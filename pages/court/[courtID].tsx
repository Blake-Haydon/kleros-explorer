import request, { gql } from "graphql-request";
import { NextPage } from "next"

import { GRAPH_ENDPOINT, IPFS_ENDPOINT } from "../../queries"

import Header from '../../components/header';
import Heading from "../../components/heading";


interface ICourtInfo {
  name: string;
  description: string;
  url: string;
}

const getIndividualCourtQuery = gql`
  query getIndividualCourtQuery ($courtID: ID!) {
    policyUpdates (where: {id: $courtID}) {
      policy
      contractAddress
    }
  }
`;

export async function getServerSideProps(context: { params: { courtID: string } }) {
  const variables = { courtID: context.params.courtID }
  const resGraph = await request(GRAPH_ENDPOINT, getIndividualCourtQuery, variables)

  // If no information of the subcourt is found, return 404
  if (resGraph.policyUpdates.length === 0) { return { notFound: true } }

  const resIPFS = await fetch(`${IPFS_ENDPOINT}${resGraph.policyUpdates[0].policy}`)
  const props: ICourtInfo = await resIPFS.json();
  return { props }
}

const CourtPage: NextPage<ICourtInfo> = ({ name, description, url }) => {
  return (
    <div>
      <Header />
      <main className="container">
        <Heading />

        <h2>{name}</h2>
        {/* TODO: find way of filtering this */}
        <p>{description}</p>
        <p>{url}</p>

      </main>
    </div>
  )
}

export default CourtPage