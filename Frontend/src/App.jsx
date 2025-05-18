import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../src/components/Login/Login';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Page1 from './components/pages/Page1';
import Page2 from './components/pages/Page2';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PrivateRoute } from './Router/PrivateRoute';
import Register from './components/Cadastro/Cadastro';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              {/* ROTAS ANINHADAS */}
              <Route index element={<Page1 />} />
              <Route path="page2" element={<Page2 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
