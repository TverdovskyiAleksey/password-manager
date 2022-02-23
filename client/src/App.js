import { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import authSelectors from './Redux/auth/auth-selectors';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';

import AppBar from './Components/AppBar/AppBar';
import Container from './Components/Container/Container';

function App() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isRefetching = useSelector(authSelectors.getRefreshing);
  const navigate = useNavigate();

  useEffect(() => {
    return isLoggedIn ? navigate('/dashboard') : navigate('/login');
  }, [isLoggedIn]);

  return (
    <Container>
      {isRefetching ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <AppBar />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default App;
