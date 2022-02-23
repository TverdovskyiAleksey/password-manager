import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../Redux/auth';

import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  return (
    <div className={styles.user}>
      <p className={styles.text}>Welcome back, {name}</p>
      <button
        className={styles.button}
        type="button"
        variant="success"
        onClick={() => dispatch(authOperations.logOut())}
      >
        Exit
      </button>
    </div>
  );
};
export default UserMenu;
