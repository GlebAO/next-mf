import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';
import { revalidate } from '@module-federation/nextjs-mf/utils';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    ctx?.res?.on('finish', () => {
      revalidate().then((shouldUpdate) => {
        console.log('finished sending response', shouldUpdate);
      });
    });
    
    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
