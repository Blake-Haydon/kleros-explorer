import { NextPage } from "next"

import Header from '../../components/header';
import Heading from "../../components/heading";


export async function getStaticPaths() {
  // Do not run slow query while in dev mode
  if (process.env.NODE_ENV === 'development') { return { paths: [], fallback: 'blocking' } }

  // TODO: CHANGE THIS TO GET ALL DISPUTES
  return {
    paths: [],
    fallback: 'blocking', // Render the page in full if it has not been rendered before
  }
}

export async function getStaticProps(context: { params: { number: string } }) {
  return {
    props: {
      number: context.params.number,
    }
  }

  return { notFound: true }
}

const DisputePage: NextPage<{ number: string }> = ({ number }) => {
  return (
    <div>
      <Header />

      <main className="container">
        <Heading />

        <p>DISPUTE: {number}</p>

      </main>
    </div>
  )
}

export default DisputePage