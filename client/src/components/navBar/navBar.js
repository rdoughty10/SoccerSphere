import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";


import "./navBar.css";
 
const Navigbar = () => {
    return (
    <>
        <Nav>
        <h1 className = "navTitle">~LOGO~SoccerSphere</h1>
            <NavMenu>
                <NavLink to="./" activeStyle>
                    Home
                </NavLink>
                <NavLink to="./pages/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="./components/DashboardContainer/DashboardContainer" activeStyle>
                    Dashboard
                </NavLink>
            </NavMenu>
        </Nav>
    </>
    );
};
 
export default Navigbar;
