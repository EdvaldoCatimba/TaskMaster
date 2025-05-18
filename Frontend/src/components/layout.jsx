import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { Bell } from "lucide-react";
import NotificationModal from "./NotificationBell/NotificationBell";
import { Outlet } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import LogoutModal from "./LogoutModal/LogoutModal";
import logo from "../assets/logo-transparent.png";
import { GoGoal,GoHomeFill } from "react-icons/go";

import {
  FaCalendarDay,
  FaCalendarMinus,
  FaCalendarAlt,
  FaBars,
  FaChartLine,
} from "react-icons/fa";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const nome = user.nome.split(" ")[0];

  const notifications = [
    "Você tem uma nova tarefa diária.",
    "Seu objetivo mensal está próximo do prazo.",
    "Nova mensagem do administrador.",
  ];
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const v = window.innerWidth >= 768
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
    if (unreadCount > 0) {
      setUnreadCount(0); // Marcar como lidas
    }
  };

  return (
    <Container>
      <Sidebar open={sidebarOpen}>
        <Re>
          <img src={logo} alt="" />
        </Re>
        <ALL>
          <Cima>
            <h3>Menu</h3>
            <StyledLink onClick={()=>{setSidebarOpen(v)}} to="/dashboard/main"  $active={location.pathname === "/dashboard/main"}>
              <GoHomeFill />
              <span>Dashboard</span>
            </StyledLink>
            <StyledLink onClick={()=>{setSidebarOpen(v)}} to="/dashboard/page1"  $active={location.pathname === "/dashboard/page1"}>
              <FaCalendarDay />
              <span>Tarefas Diárias</span>
            </StyledLink>
            <StyledLink onClick={()=>{setSidebarOpen(v)}} to="/dashboard/page2"  $active={location.pathname === "/dashboard/page2"}>
              <FaCalendarMinus />
              <span>Tarefas Semanais</span>
            </StyledLink>
            <StyledLink onClick={()=>{setSidebarOpen(v)}} to="/dashboard/page3"  $active={location.pathname === "/dashboard/page3"}>
              <FaCalendarAlt />
              <span>Tarefas Mensais</span>
            </StyledLink>
            <StyledLink onClick={()=>{setSidebarOpen(v)}} to="/dashboard/objetivo"  $active={location.pathname === "/dashboard/objetivo"}>
              <GoGoal />
              <span>Objectivos</span>
            </StyledLink>
            <StyledLink onClick={()=>{setSidebarOpen(v)}} to="/dashboard/progresso"  $active={location.pathname === "/dashboard/progresso"}>
              <FaChartLine />
              <span>Progresso</span>
            </StyledLink>
           
          </Cima>
          <Baixo>
            <LogoutButton
              onClick={() => {
                setShowLogoutModal(true);
              }}
            >
              <TbLogout size={30} />
              <span>Sair</span>
            </LogoutButton>
            <ToggleButton onClick={toggleTheme}>
              Mudar para {theme}
            </ToggleButton>
          </Baixo>
        </ALL>
      </Sidebar>
      <Navbar $sidebarOpen={sidebarOpen}>
        {!sidebarOpen ? (
          <HamburgerIcon onClick={() => setSidebarOpen(true)} />
        ) : (
          <HamburgerIcon onClick={() => setSidebarOpen(false)} />
        )}
        <UserInfo>
          <UserName1>{nome || "Usuário"}</UserName1>
        </UserInfo>
        <RightSection>
          <NotificationButton onClick={handleToggleModal}>
            <Bell size={24} color="#444" />
            {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </NotificationButton>
          <UserInfo>
            <Avatar
              src={user?.avatar || "https://i.pravatar.cc/40"}
              alt="Avatar"
            />
          </UserInfo>
        </RightSection>
      </Navbar>
      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        notifications={notifications}
      />
      <LogoutModal
        onClose={() => {
          setShowLogoutModal(false);
        }}
        onConfirm={logout}
        isOpen={showLogoutModal}
      />

      <Content $sidebarOpen={sidebarOpen}>
        <Outlet />
      </Content>
    </Container>
  );
}

const HamburgerIcon = styled(FaBars)`
  cursor: pointer;
  display: block;

  @media (min-width: 768px) {
    display: none; /* Esconde o hamburger em telas >= 768px */
  }
`;

const SIDEBAR_WIDTH = 250;
const NAVBAR_HEIGHT = 80;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #e6eefa, #f7e8f1);
`;
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const Cima = styled.div`
  display: flex;
  flex-direction: column;
`;
const Re = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${NAVBAR_HEIGHT + 50}px;
  overflow: hidden;
  img {
    width: 100px;
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const ALL = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;
const Baixo = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;
const Sidebar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: ${SIDEBAR_WIDTH}px;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  box-sizing: border-box;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 500;
  transform: ${({ open }) =>
    open ? "translateX(0)" : `translateX(-${SIDEBAR_WIDTH}px)`};
`;

const Navbar = styled.header`
  position: fixed;
  top: 0;
  left: ${({ $sidebarOpen }) => ($sidebarOpen ? `${SIDEBAR_WIDTH}px` : "0")};
  right: 0;
  height: ${NAVBAR_HEIGHT}px;
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  transition: left 0.3s ease;

  box-shadow: 0px 1px 2px gray;
`;

const Content = styled.main`
  margin-top: ${NAVBAR_HEIGHT + 10}px;
  margin-left: ${({ $sidebarOpen }) =>
    $sidebarOpen ? `${SIDEBAR_WIDTH + 10}px` : "0"};
  padding: 20px;
  background-color: ${({ theme }) => theme.bg1};
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 1px 2px gray;

  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin-left: 0 !important;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  background-color: ${({ $active }) => ($active ? "#EFF6FF" : "transparent")};
  color: ${({ $active }) => ($active ? "#2563EB" : "inherit")};

  &:hover {
    background-color: #EFF6FF;
    color: #2563EB;
  }
`;

const ToggleButton = styled.button`
  background-color: #777;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: #999;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
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
  font-size: 1rem;
  color: #333;

  @media (max-width: 640px) {
    display: none;
  }
`;
const UserName1 = styled.span`
  font-size: 0.9rem;
  color: #333;
  margin-left: 5px;
`;
const LogoutButton = styled.button`
  background-color: #e53935; /* vermelho */
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.3s;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  &:hover {
    background-color: #c62828;
  }

  &:active {
    transform: scale(0.98);
  }
  span {
    font-size: 1.6em;
  }
`;
