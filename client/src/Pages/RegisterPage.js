import { useState } from 'react';
import styles from './Styles.module.css';
import { useDispatch } from 'react-redux';
import authOperations from '../Redux/auth/auth-operations';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.register({ username, password }));
    setUsername('');
    setPassword('');
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Register page</h1>
      <form
        className={styles.registerForm}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className={styles.wrapper}>
          <label className={styles.label}>
            Username
            <input
              className={styles.inputAuth}
              type="username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.wrapper}>
          <label className={styles.label}>
            Password
            <input
              className={styles.inputAuth}
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className={styles.button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
