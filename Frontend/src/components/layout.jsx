    import React, { useState, useEffect } from 'react';
    import styled from 'styled-components';
    import { FaBars } from 'react-icons/fa';
    import { Routes, Route, Link, useLocation } from 'react-router-dom';
    import { AnimatePresence } from 'framer-motion';
    import Page1 from './pages/Page1';
    import Page2 from './pages/Page2';
    import { Outlet } from 'react-router-dom';



    const HamburgerIcon = styled(FaBars)`
    cursor: pointer;
    display: block;

    @media(min-width: 768px) {
        display: none;  /* Esconde o hamburger em telas >= 768px */
    }
    `;


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
    background-color: #222;
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
    transition: transform 0.3s ease;
    z-index: 1000;
    transform: ${({ open }) => (open ? 'translateX(0)' : `translateX(-${SIDEBAR_WIDTH}px)`)};
    `;

    const Navbar = styled.header`
    position: fixed;
    top: 0;
    left: ${({ sidebarOpen }) => (sidebarOpen ? `${SIDEBAR_WIDTH}px` : '0')};
    right: 0;
    height: ${NAVBAR_HEIGHT}px;
    background-color: #555;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    transition: left 0.3s ease;
    
    `;

    const Content = styled.main`
    margin-top: ${NAVBAR_HEIGHT}px;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? `${SIDEBAR_WIDTH}px` : '0')};
    padding: 20px;
    transition: margin-left 0.3s ease;
    `;

    const ToggleButton = styled.button`
    background-color: #777;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 10px;

    &:hover {
        background-color: #999;
    }
    `;

  export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  useEffect(() => {
    function handleResize() {
      setSidebarOpen(window.innerWidth >= 768);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <Sidebar open={sidebarOpen}>
        <h2>Sidebar</h2>
        <Link to="/dashboard">Página 1</Link>
        <br />
        <Link to="/dashboard/page2">Página 2</Link>
      </Sidebar>

      <Navbar sidebarOpen={sidebarOpen}>
        {!sidebarOpen ? (
          <HamburgerIcon onClick={() => setSidebarOpen(true)} />
        ) : (
          <HamburgerIcon onClick={() => setSidebarOpen(false)} />
        )}
        Navbar
      </Navbar>

       <Content sidebarOpen={sidebarOpen}>{children}</Content>
    </Container>
  );
}