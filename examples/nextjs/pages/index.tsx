import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Carousel from '../../../src-v5/index';

const colors = [
  '7732bb',
  '047cc0',
  '00884b',
  'e3bc13',
  'db7c00',
  'aa231f',
  'e3bc13',
  'db7c00',
  'aa231f'
];

export default function Home() {
  const slides = colors.map((color, index) => (
    <img
      src={`https://via.placeholder.com/400/${color}/ffffff/&text=slide${
        index + 1
      }`}
      alt={`Slide ${index + 1}`}
      key={color}
      style={{
        height: 400
      }}
    />
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Nuka Carousel | Formidable Labs</title>
        <meta
          name="description"
          content="Nuka Carousel example with Next.js - Formidable Labs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Nuka Carousel - SSR Example Formidable Labs</h1>
        <Carousel>{slides}</Carousel>
      </main>
    </div>
  );
}
