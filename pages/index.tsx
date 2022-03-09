import type { NextPage } from 'next'
import Link from 'next/link'

import { PNK_DECIMALS } from '../queries';
import { indexQuery, IIndexQuery } from '../queries/indexQuery';
import { pnkQuery, IPnkQuery } from '../queries/pnkQuery';

import Header from '../components/header';


export async function getStaticProps() {
  return {
    props: {
      theGraph: await indexQuery(10, 10),
      coinGecko: await pnkQuery(),
    },
    revalidate: 24 * 60 * 60, // 1 day in seconds
  }
}

const Home: NextPage<{
  theGraph: IIndexQuery,
  coinGecko: IPnkQuery
}> = ({ theGraph, coinGecko }) => {
  const stakedPNK = theGraph.tokenStaked * (10 ** -PNK_DECIMALS);
  const percentStaked = (stakedPNK / coinGecko.circulatingSupply) * 100;
  const stakedSecurityUSD = stakedPNK * coinGecko.priceUSD;

  return (
    <div>
      <Header />

      <main className="container">
        <div className="row my-5">
          <div className="col">
            <Link href="/" passHref>
              <h1 className="home-heading">Kleros Explorer</h1>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md p-3">
            <h4>Active Jurors</h4>
            <p>
              {theGraph.activeJurors.toLocaleString('en-US')} Jurors
              {' '}<i className="bi bi-info-circle-fill" title="Number of Jurors that have staked their PNK token" />
            </p>
          </div>

          <div className="col-md p-3">
            <h4>Percent Staked</h4>
            <p>
              {percentStaked.toFixed(1)}%
              {' '}<i className="bi bi-info-circle-fill" title="Staked PNK / Total PNK * 100" />
            </p>
          </div>

          <div className="col-md p-3">
            <h4>Kleros Economic Security</h4>
            <p>
              ${stakedSecurityUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              {' '}<i className="bi bi-info-circle-fill" title="The current cost to buy off each jurors staked PNK" />
            </p>
          </div>
        </div>

        <div className="row">

          <div className="col-md p-3">
            <h4>Disputes Count</h4>
            <p>
              {theGraph.disputesCount.toLocaleString('en-US')} Disputes
              {' '}<i className="bi bi-info-circle-fill" title="Total amount of disputes started on Kleros" />
            </p>
          </div>

          <div className="col-md p-3">
            <h4>Circulating Supply</h4>
            <p>
              {coinGecko.circulatingSupply.toLocaleString('en-US', { maximumFractionDigits: 0 })} PNK
              {' '}<i className="bi bi-info-circle-fill" title="Total amount of PNK tokens" />
            </p>
          </div>


          <div className="col-md p-3">
            <h4>Token Price</h4>
            <p>
              ${coinGecko.priceUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              {' '}<i className="bi bi-info-circle-fill" title="Price of a single PNK token in USD" />
            </p>
          </div>
        </div>

        <div className="row my-5">

          {/* TOP JURORS */}
          <div className="col-md">
            <h2>Top Jurors</h2>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Address</th>
                  <th scope="col" style={{ textAlign: "right" }}>Total Staked</th>
                </tr>
              </thead>
              <tbody>
                {theGraph.jurors.map((juror, index) => {
                  const jurorStakedPNK = juror.totalStaked * (10 ** -PNK_DECIMALS)
                  return (
                    <tr key={juror.id}>
                      <th scope="col">{index + 1}</th>
                      <th scope="col"><Link href={`juror/${juror.id}`}>{juror.id.slice(0, 12) + "..."}</Link></th>
                      <th scope="col" style={{ textAlign: "right" }}>{jurorStakedPNK.toLocaleString('en-US', { maximumFractionDigits: 0 })} PNK</th>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* RECENT CASES */}
          <div className="col-md">
            <h2>Recent Cases</h2>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Case Number</th>
                  {/* TODO: Use court name instead of court ID */}
                  <th scope="col" style={{ textAlign: "right" }}>Court ID</th>
                </tr>
              </thead>
              <tbody>
                {theGraph.disputes.map(disputes => {
                  return (
                    <tr key={disputes.disputeID}>
                      <th scope="col"><Link href={`dispute/${disputes.disputeID}`}>{disputes.disputeID}</Link></th>
                      <th scope="col" style={{ textAlign: "right" }}><Link href={`court/${disputes.subcourtID}`}>{"Court " + disputes.subcourtID}</Link></th>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div >
  )
}

export default Home
