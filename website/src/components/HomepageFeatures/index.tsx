import React from 'react';

import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Visual regression testing',
    imageSource: '/images/homepage/diff.png',
    description: (
      <>We've created a simple api for capturing and comparing screenshots.</>
    ),
  },
  {
    title: 'Take screenshots from your app',
    imageSource: '/images/homepage/mockup.png',
    description: (
      <>
        Owl was designed make it easy to add visual regression testing to your
        react native app.
      </>
    ),
  },
  {
    title: 'View the differences',
    imageSource: '/images/homepage/report.png',
    description: (
      <>
        Owl clearly highlights all visual differences, so no need to play
        spot-the-difference yourself!
      </>
    ),
  },
];

export const HomepageFeatures: React.FC = () => {
  return (
    <>
      {FeatureList.map(({ title, description, imageSource }, idx) => {
        return (
          <section key={idx} className={styles.feature}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{description}</p>

            <div>
              {!!imageSource && (
                <img
                  src={`/open-source/react-native-owl${imageSource}`}
                  className={styles.sectionImageMockup}
                />
              )}
            </div>
          </section>
        );
      })}
    </>
  );
};
