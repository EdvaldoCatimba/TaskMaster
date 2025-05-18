import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../layout'; // já contém o <Outlet />

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return <Layout />; // Sem Outlet aqui
};

export default Dashboard;
