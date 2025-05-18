import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import Logo from '../../assets/logo-transparent.png';

const NavbarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    height: 30px;
  }

  span {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.1rem;
  }

  .user {
    font-weight: 500;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <NavbarContainer>
      <Brand>
        <img src={Logo} alt="Logo" />
        <span>MinhaApp</span>
      </Brand>
      <RightArea>
        {user && <span className="user">Olá, {user.nome}</span>}
        <button onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        <button onClick={logout} title="Sair">
          Sair
        </button>
      </RightArea>
    </NavbarContainer>
  );
};

export default Navbar;
