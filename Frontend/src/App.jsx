import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/components/Login/Login";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Page1 from "./components/pages/Page1";
import Page2 from "./components/pages/Page2";
import Page3 from "./components/pages/Page3";
import Objectivo from "./components/pages/Objetivo";
import Progresso from "./components/pages/Progresso";
import Main from "./components/pages/Main";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./Router/PrivateRoute";
import { AdminRoute } from "./Router/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Cadastro/Cadastro";
import AdminDashboard from "./components/Dashboard/AdminDashboard/LayoutAdmin/DashboardAdmin/Dashboard.Admin";
import Usuarios from "./components/Dashboard/AdminDashboard/LayoutAdmin/Usuarios/Usuarios";
import Relatorios from "./components/Dashboard/AdminDashboard/LayoutAdmin/Relatorios/Relatorio";
import Configuracoes from "./components/Dashboard/AdminDashboard/LayoutAdmin/Configuracoes/Configuracoes";
import AdminLayout from "./components/Dashboard/AdminDashboard/LayoutAdmin/LayoutAdmin";
import "./App.css";

// Aqui está o provider completo com styled-components
import { CombinedThemeProvider } from "./context/CombinedThemeProvider";

const App = () => {
  return (
    <CombinedThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route element={<Dashboard />}>
                <Route index element={<Navigate to="Main" />} />
                <Route path="page1" element={<Page1 />} />
                <Route path="page2" element={<Page2 />} />
                <Route path="page3" element={<Page3 />} />
                <Route path="objetivo" element={<Objectivo />} />
                <Route path="progresso" element={<Progresso />} />
                <Route path="main" element={<Main />} />
              </Route>
            </Route>
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="relatorios" element={<Relatorios />} />
                <Route path="configuracoes" element={<Configuracoes />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </CombinedThemeProvider>
  );
};

export default App;
