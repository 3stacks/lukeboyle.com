import React from "react"
import Helmet from "react-helmet"

export default function NotFoundError() {
    return (
        <div>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <h1>Not Found</h1>
        </div>
    );
}
