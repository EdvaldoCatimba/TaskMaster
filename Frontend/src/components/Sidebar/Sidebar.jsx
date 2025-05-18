import { useState } from 'react';
import { SidebarContainer, ToggleButton, NavLinkStyled } from './SidebarStyled';
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </ToggleButton>

      <SidebarContainer isOpen={isOpen}>
        <h2>Menu</h2>
        <nav>
          <NavLinkStyled to="/dashboard" onClick={() => setIsOpen(false)}>
            <FaHome /> Dashboard
          </NavLinkStyled>
          <NavLinkStyled to="/perfil" onClick={() => setIsOpen(false)}>
            <FaUser /> Perfil
          </NavLinkStyled>
          <NavLinkStyled to="/configuracoes" onClick={() => setIsOpen(false)}>
            <FaCog /> Configurações
          </NavLinkStyled>
          <NavLinkStyled as="button" onClick={handleLogout} style={{ background: 'none', border: 'none', textAlign: 'left' }}>
            <FaSignOutAlt /> Sair
          </NavLinkStyled>
        </nav>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
