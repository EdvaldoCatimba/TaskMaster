
import styled from 'styled-components';

    const SIDEBAR_WIDTH = 250;
     const NAVBAR_HEIGHT = 60;

 export const HamburgerIcon = styled(FaBars)`
    cursor: pointer;
    display: block;

    @media(min-width: 768px) {
        display: none;  
    }
    `;
export const Container = styled.div`
    display: flex;
    height: 100vh;
    `;

   export const Sidebar = styled.nav`
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

     export const Navbar = styled.header`
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

   export const Content = styled.main`
    margin-top: ${NAVBAR_HEIGHT}px;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? `${SIDEBAR_WIDTH}px` : '0')};
    padding: 20px;
    transition: margin-left 0.3s ease;
    `;

   export const ToggleButton = styled.button`
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
