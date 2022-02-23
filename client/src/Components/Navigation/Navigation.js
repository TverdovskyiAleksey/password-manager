import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../Redux/auth/auth-selectors';
import styles from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const setActive = ({ isActive }) => ({
    color: isActive ? '#2196f3' : 'white',
  });
  return (
    <nav className={styles.nav}>
      {isLoggedIn && (
        <NavLink to="/dashboard" style={setActive} className={styles.link}>
          Dashboard
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;
