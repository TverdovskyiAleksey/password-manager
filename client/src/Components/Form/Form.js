import styles from './Form.module.css';
import shortid from 'shortid';

const Form = ({
  onHandleChange,
  onHandleSubmit,
  source,
  username,
  password,
}) => {
  return (
    <form className={styles.form} onSubmit={onHandleSubmit} autoComplete="off">
      <div className={styles.wrapper}>
        <label className={styles.label}>
          Source
          <input
            id={shortid.generate()}
            className={styles.input}
            type="source"
            name="source"
            value={source}
            onChange={onHandleChange}
            required
          />
        </label>
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label}>
          Username
          <input
            id={shortid.generate()}
            className={styles.input}
            type="username"
            name="username"
            value={username}
            onChange={onHandleChange}
            required
          />
        </label>
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label}>
          Password
          <input
            id={shortid.generate()}
            className={styles.input}
            type="text"
            name="password"
            value={password}
            onChange={onHandleChange}
            required
          />
        </label>
      </div>

      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
