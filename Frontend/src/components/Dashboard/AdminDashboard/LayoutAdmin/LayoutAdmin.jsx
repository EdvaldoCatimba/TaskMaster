import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../../../../context/ThemeContext";
import { Bell } from "lucide-react";
import NotificationModal from "../../../NotificationBell/NotificationBell";
import { Outlet } from "react-router-dom";

// Reaproveitamento dos estilos do Layout principal
const SIDEBAR_WIDTH = 250;
const NAVBAR_HEIGHT = 60;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: ${SIDEBAR_WIDTH}px;
  height: 100vh;
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transform: ${({ open }) =>
    open ? "translateX(0)" : `translateX(-${SIDEBAR_WIDTH}px)`};
`;

const Navbar = styled.header`
  position: fixed;
  top: 0;
  left: ${({ $sidebarOpen }) => ($sidebarOpen ? `${SIDEBAR_WIDTH}px` : "0")};
  right: 0;
  height: ${NAVBAR_HEIGHT}px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  transition: left 0.3s ease;
`;

const Content = styled.main`
  margin-top: ${NAVBAR_HEIGHT}px;
  margin-left: ${({ $sidebarOpen }) =>
    $sidebarOpen ? `${SIDEBAR_WIDTH}px` : "0"};
  padding: 20px;
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin-left: 0 !important;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  margin-bottom: 12px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ToggleButton = styled.button`
  background-color: #666;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: auto;

  &:hover {
    background-color: #888;
  }
`;

const HamburgerIcon = styled(FaBars)`
  cursor: pointer;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: red;
  color: white;
  font-size: 0.7rem;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  color: #fff;

  @media (max-width: 640px) {
    display: none;
  }
`;

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const notifications = [
    "Novo usuário registrado.",
    "Solicitação de suporte pendente.",
    "Atualização de sistema disponível.",
  ];
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  useEffect(() => {
    function handleResize() {
      setSidebarOpen(window.innerWidth >= 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleModal = () => {
    setShowModal(!showModal);
    if (unreadCount > 0) setUnreadCount(0);
  };

  return (
    <Container>
      <Sidebar open={sidebarOpen}>
        <h2>Admin Panel</h2>
        <StyledLink to="/admin/dashboard">Dashboard</StyledLink>
        <StyledLink to="/admin/usuarios">Gerenciar Usuários</StyledLink>
        <StyledLink to="/admin/relatorios">Relatórios</StyledLink>
        <StyledLink to="/admin/configuracoes">Configurações</StyledLink>
        <button onClick={logout}>Sair</button>
        <ToggleButton onClick={toggleTheme}>Tema: {theme}</ToggleButton>
      </Sidebar>

      <Navbar $sidebarOpen={sidebarOpen}>
        <HamburgerIcon onClick={() => setSidebarOpen(!sidebarOpen)} />
        <RightSection>
          <NotificationButton onClick={handleToggleModal}>
            <Bell size={24} color="#fff" />
            {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </NotificationButton>
          <UserInfo>
            <Avatar
              src={user?.avatar || "https://i.pravatar.cc/40"}
              alt="Admin Avatar"
            />
            <UserName>{user?.nome || "Admin"}</UserName>
            <UserName>{user?.tipo || "Administrador"}</UserName>
          </UserInfo>
        </RightSection>
      </Navbar>

      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        notifications={notifications}
      />

      <Content $sidebarOpen={sidebarOpen}>
        <Outlet />
      </Content>
    </Container>
  );
}
