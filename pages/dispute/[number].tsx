import { NextPage } from "next"
import Link from "next/link"

export async function getStaticPaths() {
  // Do not run slow query while in dev mode
  if (process.env.NODE_ENV === 'development') {
    return {
      paths: [],
      fallback: true,
    }
  }

  // TODO: CHANGE THIS TO GET ALL DISPUTES
  return {
    paths: [],
    fallback: true,
  }

}

export async function getStaticProps(context: { params: { number: string } }) {
  // Validate address is a valid ethereum address
  return {
    props: {
      number: context.params.number,
    }
  }

  return { notFound: true }
}

const DisputePage: NextPage<{ number: string }> = ({ number }) => {
  return (<div>
    <main className="container">
      <div className="row my-5">
        <div className="col">
          <Link href="/" passHref>
            <h1 className="home-heading">Kleros Explorer</h1>
          </Link>
        </div>
      </div>

      <p>DISPUTE: {number}</p>

    </main>
  </div>
  )
}

export default DisputePage