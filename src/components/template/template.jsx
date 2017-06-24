import React from 'react';

export default function Template({body, title, ...otherProps}) {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <title>{title}</title>
                <script src="bundle.js" defer/>
            </head>
            <body>
                <div id='root' dangerouslySetInnerHTML={{ __html: body }} />
            </body>
        </html>
    );
}