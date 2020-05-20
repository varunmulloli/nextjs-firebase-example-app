import React from 'react';
import { get } from 'lodash/object';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    const { loggedInUser } = this.props;
    
    return (
      <Html>
        <Head>
          <script id="__LOGGED_IN_USER" type="application/json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(loggedInUser, null, 2) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async ctx => {
  const initialProps = await Document.getInitialProps(ctx);
  const loggedInUser = get(ctx, 'customData.loggedInUser', null);
  return { ...initialProps, loggedInUser };
}

export default CustomDocument;
