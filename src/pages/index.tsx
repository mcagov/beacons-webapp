import React, { FunctionComponent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div
        className="govuk-accordion"
        data-module="govuk-accordion"
        id="accordion-default"
      >
        <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <span
                className="govuk-accordion__section-button"
                id="accordion-default-heading-1"
              >
                Writing well for the web
              </span>
            </h2>
          </div>
          <div
            id="accordion-default-content-1"
            className="govuk-accordion__section-content"
            aria-labelledby="accordion-default-heading-1"
          >
            <p className="govuk-body">
              This is the content for Writing well for the web.
            </p>
          </div>
        </div>
        <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <span
                className="govuk-accordion__section-button"
                id="accordion-default-heading-2"
              >
                Writing well for specialists
              </span>
            </h2>
          </div>
          <div
            id="accordion-default-content-2"
            className="govuk-accordion__section-content"
            aria-labelledby="accordion-default-heading-2"
          >
            <p className="govuk-body">
              This is the content for Writing well for specialists.
            </p>
          </div>
        </div>
        <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <span
                className="govuk-accordion__section-button"
                id="accordion-default-heading-3"
              >
                Know your audience
              </span>
            </h2>
          </div>
          <div
            id="accordion-default-content-3"
            className="govuk-accordion__section-content"
            aria-labelledby="accordion-default-heading-3"
          >
            <p className="govuk-body">
              This is the content for Know your audience.
            </p>
          </div>
        </div>
        <div className="govuk-accordion__section ">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <span
                className="govuk-accordion__section-button"
                id="accordion-default-heading-4"
              >
                How people read
              </span>
            </h2>
          </div>
          <div
            id="accordion-default-content-4"
            className="govuk-accordion__section-content"
            aria-labelledby="accordion-default-heading-4"
          >
            <p className="govuk-body">
              This is the content for How people read.
            </p>
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

      <div className="govuk-tabs" data-module="govuk-tabs">
        <h2 className="govuk-tabs__title">Contents</h2>
        <ul className="govuk-tabs__list">
          <li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
            <a className="govuk-tabs__tab" href="#past-day">
              Past day
            </a>
          </li>
          <li className="govuk-tabs__list-item">
            <a className="govuk-tabs__tab" href="#past-week">
              Past week
            </a>
          </li>
          <li className="govuk-tabs__list-item">
            <a className="govuk-tabs__tab" href="#past-month">
              Past month
            </a>
          </li>
          <li className="govuk-tabs__list-item">
            <a className="govuk-tabs__tab" href="#past-year">
              Past year
            </a>
          </li>
        </ul>
        <div className="govuk-tabs__panel" id="past-day">
          <h2 className="govuk-heading-l">Past day</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">
                  Case manager
                </th>
                <th scope="col" className="govuk-table__header">
                  Cases opened
                </th>
                <th scope="col" className="govuk-table__header">
                  Cases closed
                </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">3</td>
                <td className="govuk-table__cell">0</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Paul Farmer</td>
                <td className="govuk-table__cell">1</td>
                <td className="govuk-table__cell">0</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Rita Patel</td>
                <td className="govuk-table__cell">2</td>
                <td className="govuk-table__cell">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="govuk-tabs__panel govuk-tabs__panel--hidden"
          id="past-week"
        >
          <h2 className="govuk-heading-l">Past week</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">
                  Case manager
                </th>
                <th scope="col" className="govuk-table__header">
                  Cases opened
                </th>
                <th scope="col" className="govuk-table__header">
                  Cases closed
                </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">24</td>
                <td className="govuk-table__cell">18</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Paul Farmer</td>
                <td className="govuk-table__cell">16</td>
                <td className="govuk-table__cell">20</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Rita Patel</td>
                <td className="govuk-table__cell">24</td>
                <td className="govuk-table__cell">27</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="govuk-tabs__panel govuk-tabs__panel--hidden"
          id="past-month"
        >
          <h2 className="govuk-heading-l">Past month</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">
                  Case manager
                </th>
                <th scope="col" className="govuk-table__header">
                  Cases opened
                </th>
                <th scope="col" className="govuk-table__header">
                  Cases closed
                </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">98</td>
                <td className="govuk-table__cell">95</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Paul Farmer</td>
                <td className="govuk-table__cell">122</td>
                <td className="govuk-table__cell">131</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Rita Patel</td>
                <td className="govuk-table__cell">126</td>
                <td className="govuk-table__cell">142</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="govuk-tabs__panel govuk-tabs__panel--hidden"
          id="past-year"
        >
          <h2 className="govuk-heading-l">Past year</h2>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">
                  Case manager
                </th>
                <th scope="col" className="govuk-table__header">
                  Cases opened
                </th>
                <th scope="col" className="govuk-table__header">
                  Cases closed
                </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">David Francis</td>
                <td className="govuk-table__cell">1380</td>
                <td className="govuk-table__cell">1472</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Paul Farmer</td>
                <td className="govuk-table__cell">1129</td>
                <td className="govuk-table__cell">1083</td>
              </tr>
              <tr className="govuk-table__row">
                <td className="govuk-table__cell">Rita Patel</td>
                <td className="govuk-table__cell">1539</td>
                <td className="govuk-table__cell">1265</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
