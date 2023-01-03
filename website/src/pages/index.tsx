import React from 'react';
import Layout from '@theme/Layout';

import { Hero } from '../components/Hero';
import { HomepageFeatures } from '../components/HomepageFeatures';

const META_DESCRIPTION =
  'React Native Owl is a visual regression testing library for React Native that enables developers to introduce visual regression tests to their apps for iOS and Android.';

export default function Home() {
  return (
    <Layout
      title="Small, fast and accessibility-first React carousel library"
      description={META_DESCRIPTION}
      wrapperClassName="homepage"
    >
      <Hero />
      <main className="container">
        <h2>About</h2>
        <p className="intro">
          This visual regression testing for React Native library enables
          developers to introduce visual regression tests to their apps for{' '}
          <strong>iOS</strong> and <strong>Android</strong>. Being heavily
          inspired by{' '}
          <a
            href="https://wix.github.io/Detox/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Detox
          </a>
          , an end-to-end testing and automation framework, this library uses a
          similar API that makes setting up react-native-owl and running the
          tests locally and on your preferred CI service, seamless.
        </p>

        <p className="intro">
          Learn more about the background behind this library in{' '}
          <a href="/blog/2022/react-native-owl/" target="_blank">
            the announcement on the Formidable Blog
          </a>
          .
        </p>

        <HomepageFeatures />
      </main>
    </Layout>
  );
}
