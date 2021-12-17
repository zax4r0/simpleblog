/* eslint-disable react/display-name */

import Head from "next/head"
import Image from "next/image"

export default () => (
  <>
    <Head>
      <title>next-pwa example</title>
    </Head>
    <h1>This is offline fallback page</h1>
    <h2>When offline, any page route will fallback to this page</h2>
    <Image src="/hmmm.svg" width={100} height={100} />
  </>
)
