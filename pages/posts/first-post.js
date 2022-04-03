import Link from "next/link";
import Head from "next/head";

export default function firstPost() {
  return (
    <>
      <Head>
        <title>First post</title>
      </Head>
      <Link href="/">Go back</Link>
      <h1>First post</h1>
    </>
  );
}
