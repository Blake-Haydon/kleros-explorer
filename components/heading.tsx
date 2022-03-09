import Link from "next/link"

const Heading = () => (
    <div className="row my-5">
        <div className="col">
            <Link href="/" passHref>
                <h1 className="home-heading">Kleros Explorer</h1>
            </Link>
        </div>
    </div>
)

export default Heading