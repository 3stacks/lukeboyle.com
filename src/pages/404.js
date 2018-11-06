import React from "react"
import Helmet from "react-helmet"
import {Link} from 'gatsby';

export default function NotFoundError() {
    return (
        <div>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <h1>Not Found</h1>
            <p>
                The page you are looking for doesn't exist.
                I'll be honest, it was probably my fault.
            </p>

            <Link href="/">
                Go back to Home
            </Link>
        </div>
    );
}
