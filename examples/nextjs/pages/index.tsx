import 'wicg-inert';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Carousel from 'nuka-carousel';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { slideImages } from '../src/slideImages';

type HomeProps = {
  urlParams: Record<string, string>;
};

const Home = ({ urlParams }: HomeProps) => {
  const slides = slideImages
    .slice(0, Number(urlParams.slides || 9))
    .map((slideImage, index) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={slideImage}
        key={index}
        alt={`Slide ${index + 1}`}
        data-slide={`Slide ${index + 1}`}
        style={{
          width: '100%',
          height: 400
        }}
      />
    ));

  const carouselParams = urlParams.params ? JSON.parse(urlParams.params) : {};

  return (
    <div className={styles.container}>
      <Head>
        <title>Nuka Carousel | Formidable</title>
        <meta
          name="description"
          content="Nuka Carousel example with Next.js - Formidable Labs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Nuka Carousel Demo using NextJS</h1>
        <Carousel {...carouselParams}>{slides}</Carousel>
      </main>
      <footer>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://vercel.com?utm_source=nuka-carousel&utm_campaign=oss"
        >
          <Image
            alt="Powered by Vercel"
            src="/powered-by-vercel.svg"
            width={100}
            height={20}
          />
        </a>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    urlParams: context.query
  }
});

export default Home;
