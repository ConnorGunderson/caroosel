import Layout from '@/components/Layout';
import { sendForm } from 'emailjs-com';
import styles from '@/styles/contact.module.css';

const ContactPage = () => {
  const sendEmail = (e) => {
    e.preventDefault();
    sendForm(
      'gmail',
      'template_mqhbem8',
      e.target,
      'user_GKQPloTdjIOKjymvG2Jjf'
    ).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );
    e.target.reset();
  };

  return (
    <Layout>
      <form className={styles.form} onSubmit={sendEmail}>
        <h2 aria-label="send email to owner" className={styles.formHeader}>
          Email Connor
        </h2>
        <div className={styles.formGroup}>
          <label htmlFor="sender">Your Name:</label>
          <input
            aria-label="name"
            placeholder="name"
            name="sender"
            required
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subject">Subject:</label>
          <input
            aria-label="subject"
            placeholder="subject"
            name="subject"
            required
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            aria-label="message"
            placeholder="type message here..."
            name="message"
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.send}>
          Send
        </button>
      </form>
    </Layout>
  );
};

export default ContactPage;
