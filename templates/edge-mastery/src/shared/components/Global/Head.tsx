import Head from "next/head";

export function HeadExt() {
  return (
    <Head>
      <link rel="prefetch" href="https://www.gstatic.com/draco/v1/decoders/draco_wasm_wrapper.js" />
      <link rel="prefetch" href="https://www.gstatic.com/draco/v1/decoders/draco_decoder.wasm" />
    </Head>
  );
}
