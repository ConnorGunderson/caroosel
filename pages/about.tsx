import Layout from '@/components/Layout';
import styles from '@/styles/about.module.css'
const AboutPage = () => {
  return (
    <Layout>
      <section>
        <article>
          <p>
            Caroosel is a platform where users can upload and mix music and
            sounds. The primary motive for this application was for the creator
            to have a customizable dashboard for which they could upload sounds
            to mix together much like{' '}
            <a href="https://asoftmurmur.com" target="_blank">
              <em>asoftmurmur.com</em>
            </a>
            .
          </p>
          <p className={styles.p}>
            There are additional settings attached to each card. to change the
            song, please upload either a .mp3 or .wav file in the card settings.
            If you wish to change the image, a valid image <b>url</b> will be
            acceptable. Its advisable to download a image that is at most 250px
            in width and height for maximum site performance. Thank you.
          </p>
          <p className={styles.p}>
            This application was created by Connor Gunderson. Future updates are
            not decided at this time. This application was originally made for a
            class.
          </p>
        </article>
      </section>
    </Layout>
  );
};

export default AboutPage;
