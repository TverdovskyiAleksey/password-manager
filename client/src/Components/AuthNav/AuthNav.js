import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';

const AuthNav = () => {
  const setActive = ({ isActive }) => ({
    color: isActive ? '#2196f3' : 'white',
  });
  return (
    <nav>
      <NavLink to="/login" style={setActive} className={styles.link}>
        Login
      </NavLink>

      <NavLink to="/register" style={setActive} className={styles.link}>
        Register
      </NavLink>
    </nav>
  );
};
export default AuthNav;
