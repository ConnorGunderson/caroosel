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
        <h2 className={styles.formHeader}>Email Connor</h2>
        <div className={styles.formGroup}>
          <label htmlFor="sender">Your Name:</label>
          <input placeholder="name" name="sender"></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subject">Subject:</label>
          <input placeholder="subject" name="subject"></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            placeholder="type message here..."
            name="message"
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
