import React, { FunctionComponent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className="govuk-accordion" data-module="govuk-accordion" id="accordion-default">
        <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
        <span className="govuk-accordion__section-button" id="accordion-default-heading-1">
          Writing well for the web
        </span>
            </h2>
          </div>
          <div id="accordion-default-content-1" className="govuk-accordion__section-content"
               aria-labelledby="accordion-default-heading-1">
            <p className='govuk-body'>This is the content for Writing well for the web.</p>
          </div>
        </div>
        <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
        <span className="govuk-accordion__section-button" id="accordion-default-heading-2">
          Writing well for specialists
        </span>
            </h2>
          </div>
          <div id="accordion-default-content-2" className="govuk-accordion__section-content"
               aria-labelledby="accordion-default-heading-2">
            <p className='govuk-body'>This is the content for Writing well for specialists.</p>
          </div>
        </div>
        <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
        <span className="govuk-accordion__section-button" id="accordion-default-heading-3">
          Know your audience
        </span>
            </h2>
          </div>
          <div id="accordion-default-content-3" className="govuk-accordion__section-content"
               aria-labelledby="accordion-default-heading-3">
            <p className='govuk-body'>This is the content for Know your audience.</p>
          </div>
        </div>
        <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
        <span className="govuk-accordion__section-button" id="accordion-default-heading-4">
          How people read
        </span>
            </h2>
          </div>
          <div id="accordion-default-content-4" className="govuk-accordion__section-content"
               aria-labelledby="accordion-default-heading-4">
            <p className='govuk-body'>This is the content for How people read.</p>
          </div>
        </div>
      </div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
