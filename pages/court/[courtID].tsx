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

const getAllCourtsQuery = gql`
  query getAllCourtsQuery {
    policyUpdates {
      subcourtID
    }
  }
`;

const getIndividualCourtQuery = gql`
  query getIndividualCourtQuery ($courtID: ID!) {
    policyUpdates (where: {id: $courtID}) {
      policy
      contractAddress
    }
  }
`;

export async function getStaticPaths() {
  // Do not run slow query while in dev mode
  if (process.env.NODE_ENV === 'development') { return { paths: [], fallback: 'blocking' } }

  const res = await request(GRAPH_ENDPOINT, getAllCourtsQuery)
  const policyUpdates: { subcourtID: string }[] = res.policyUpdates;
  return {
    paths: policyUpdates.map(court => ({
      params: { courtID: court.subcourtID }
    })),
    fallback: 'blocking', // Render the page in full if it has not been rendered before
  }
}

export async function getStaticProps(context: { params: { courtID: string } }) {
  const variables = { courtID: context.params.courtID }
  const resGraph = await request(GRAPH_ENDPOINT, getIndividualCourtQuery, variables)

  // If no information of the subcourt is found, return 404
  if (resGraph.policyUpdates.length === 0) { return { notFound: true } }

  const resIPFS = await fetch(`${IPFS_ENDPOINT}${resGraph.policyUpdates[0].policy}`)
  const courtInfo: ICourtInfo = await resIPFS.json();
  return {
    props: {
      courtID: context.params.courtID,
      courtInfo: courtInfo,
    }
  }
}

const CourtPage: NextPage<{ courtID: string, courtInfo: ICourtInfo }> = ({ courtID, courtInfo }) => {
  return (
    <div>
      <Header />
      <main className="container">
        <Heading />

        <h2>{courtInfo.name}</h2>
        {/* TODO: find way of filtering this */}
        <p>{courtInfo.description}</p>

      </main>
    </div>
  )
}

export default CourtPage