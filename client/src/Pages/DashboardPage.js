import { useState, useEffect } from 'react';
import styles from './Styles.module.css';
import Modal from '../Components/Modal/Modal';
import * as Api from '../Services/passwords-api';

import { IoMdEye, IoMdEyeOff, IoIosTrash, IoIosRefresh } from 'react-icons/io';
import Form from '../Components/Form/Form';

const DashboardPage = () => {
  const [source, setSource] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    Api.fetchPasswords().then(response => setResult(response.result));
  }, []);

  const onHandleSubmit = e => {
    e.preventDefault();
    Api.addPassword({ source, username, password }).then(data => {
      setResult(prevState => [...prevState, data.result]);
    });
    resetValue();
  };

  const onHandleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'source':
        return setSource(value);
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };

  const onUpdate = async e => {
    e.preventDefault();
    Api.updatePassword(currentId, { source, username, password });
    Api.fetchPasswords();
    onToggleModal(false);
  };

  const onDeletePassword = passId => {
    Api.deletePassword(passId).then(
      setResult(prevState => prevState.filter(item => item._id !== passId))
    );
  };

  const resetValue = () => {
    setSource('');
    setUsername('');
    setPassword('');
  };

  const onToggleModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      resetValue();
    }
  };

  const onHandleIconClick = id => {
    setCurrentId(id);
    for (let i = 0; i < result.length; i += 1) {
      const e = result[i]._id;
      if (e === id) {
        setSource(result[i].source);
        setUsername(result[i].username);
        setPassword(result[i].password);
      }
    }
    onToggleModal(true);
  };
  const onPassShow = id => {
    setCurrentId(id);
    setShowPassword(!showPassword);
    setTimeout(() => {
      setCurrentId('');
      setShowPassword(showPassword);
    }, 2000);
  };

  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.title}>Dashboard form</h2>
        <Form
          onHandleChange={onHandleChange}
          onHandleSubmit={onHandleSubmit}
          source={source}
          username={username}
          password={password}
        />
      </div>
      <div className={styles.passwordList}>
        <h2 className={styles.title}>Saved passwords</h2>
        <div className={styles.wrapper}>
          <p className={styles.text}>Site</p>
          <p className={styles.text}>User name</p>
          <p className={styles.text}>Password</p>
        </div>
        <ul>
          {result.map(({ _id, source, username, password }) => (
            <li key={_id} className={styles.list}>
              <div className={styles.wrapper}>
                <div className={styles.wrapper}>
                  <div className={styles.input}>{source}</div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.input}>{username}</div>
                </div>
                <div className={styles.wrapper}>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      type={_id === currentId ? 'text' : 'password'}
                      id={_id}
                      value={password}
                      aria-label="pass"
                      readOnly
                      disabled={true}
                    />
                  </label>
                </div>
                <button
                  onClick={() => onPassShow(_id)}
                  className={styles.buttonIcon}
                >
                  {showPassword ? (
                    <IoMdEyeOff size="30px" />
                  ) : (
                    <IoMdEye size="30px" />
                  )}
                </button>
                <button
                  onClick={() => onHandleIconClick(_id)}
                  className={styles.buttonIcon}
                >
                  <IoIosRefresh size="30px" className={styles.icon} />
                </button>
                <button
                  onClick={() => onDeletePassword(_id)}
                  className={styles.buttonIcon}
                >
                  <IoIosTrash size="30px" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {showModal && (
          <Modal onClose={onToggleModal}>
            <Form
              onHandleChange={onHandleChange}
              onHandleSubmit={onUpdate}
              source={source}
              username={username}
              password={password}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
