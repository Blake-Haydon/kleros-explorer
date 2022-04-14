import { NextPage } from "next"

import Header from '../../components/header';
import Heading from "../../components/heading";


export async function getServerSideProps(context: { params: { disputeID: string } }) {
  try {
    return {
      props: {
        disputeID: context.params.disputeID,
      }
    }
  } catch (error) {
    return { notFound: true }
  }
}

const DisputePage: NextPage<{ disputeID: string }> = ({ disputeID }) => {
  return (
    <div>
      <Header />

      <main className="container">
        <Heading />

        <p>DISPUTE: {disputeID}</p>

      </main>
    </div>
  )
}

export default DisputePage