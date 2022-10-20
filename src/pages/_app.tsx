import type { AppProps } from 'next/app';
import Breadcrumbs from '../components/Breadcrumbs';
import Head from 'next/head';
import { useState } from 'react';
import { PageDetails } from '../types';
import { useRouter } from 'next/router';
import '../styles/globals.scss';
import ReviewContextProvider from '../store/reviews-context';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [detailsPageInfo, setDetailsLastPageInfo] = useState<PageDetails>({
    isDetails: false,
    pageTitle: ''
  });

  const setPageDetails = (details: PageDetails) => {
    setDetailsLastPageInfo(details);
  };

  return (
    <ReviewContextProvider>
      <Head>
        <title>{'SWAPI - ' + detailsPageInfo.pageTitle}</title>
      </Head>
      <h1>SWAPI - 'MERCE TASK</h1>
      <Breadcrumbs details={detailsPageInfo} />
      <Component {...pageProps} showPageDetails={setPageDetails} />

      {router.asPath !== '/' && (
        <div className="backButtonBox">
          <button className="buttonHover" onClick={() => router.back()}>
            &#8249; Powrót
          </button>
        </div>
      )}
    </ReviewContextProvider>
  );
}

export default MyApp;
