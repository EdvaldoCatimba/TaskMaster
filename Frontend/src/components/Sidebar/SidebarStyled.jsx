import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const ToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: #222;
  color: #fff;
  border: none;
  padding: 0.6rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 250px;
  height: 100vh;
  background-color: #1e1e2f;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease-in-out;
  z-index: 1000;

  h2 {
    margin-bottom: 2rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 1rem;
  color: #ccc;
  text-decoration: none;
  border-radius: 0.5rem;

  &.active {
    background-color: #333;
    color: #fff;
  }

  &:hover {
    background-color: #2c2c3d;
    color: #fff;
  }
`;
