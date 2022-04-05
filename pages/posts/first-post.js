import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/react";

export default function firstPost() {
  const session = useSession();
  console.log({ session });
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
