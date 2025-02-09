import Head from "next/head";
import Page from "./(match)/match/page";

export default function Home() {
  return (
    <>
      <Head>
        <title>Match My Company - Find Your Compatibility</title>
        <meta name="description" content="Discover how well you match with your company! Just a fun compatibility test for professionals." />
        <meta name="keywords" content="company match, work compatibility, career fun, job fit test" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="Match My Company - Find Your Compatibility" />
        <meta property="og:description" content="See how well you match with your company." />
        <meta property="og:url" content="https://match-my-company.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://c.ndtvimg.com/2024-04/9kb3o88_sad-employee_625x300_15_April_24.jpeg?downsize=773:435" />
      </Head>
      <Page />
    </>
  );
}
