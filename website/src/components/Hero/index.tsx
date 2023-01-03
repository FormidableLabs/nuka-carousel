import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

import styles from './styles.module.css';

const LogoBadge = require('../../../static/images/nuka.svg').default;

const heroExample = `describe('App.tsx', () => {
  it('presses a button & takes a screenshot', async () => {
    await press('button');

    const screen = await takeScreenshot('homescreen');

    expect(screen).toMatchBaseline();
  });
});`;

export const Hero = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <LogoBadge className={styles.logoBadge} />
            <h1 className="hero__title">{siteConfig.title}</h1>
            <h2 className={styles.heroSubtitle}>{siteConfig.tagline}</h2>

            <div className={styles.buttons}>
              <Link
                className={`button button--secondary button--lg ${styles.ctaButton}`}
                to="/docs/getting-started"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className={clsx('col col--6', styles.codeSampleWrapper)}>
            <CodeBlock className={styles.codeSample}>{heroExample}</CodeBlock>
          </div>
        </div>
      </div>
    </header>
  );
};
