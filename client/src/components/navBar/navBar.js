import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
// import logoImage from "logo4.png";
import "./navBar.css";
 
const Navigbar = () => {
    return (
    <>
        <Nav>
            <NavLink to="./" activeStyle>
                <h1 className = "logo-img">
                    {/* <img src={"logo4.png"} className="logo-img" /> */}
                </h1>
            </NavLink>
            {/* <h1 className = "logo-img">
                { <img src={"logo4.png"} className="logo-img" /> }
            </h1> */}
            <NavMenu>
                <NavLink to="./" activeStyle>
                    Home
                </NavLink>
                <NavLink to="./pages/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="./components/EventDashboard/DashboardContainer/DashboardContainer" activeStyle>
                    Dashboard
                </NavLink>
                <NavLink to="./components/TeamsDashboard/TeamsDashboardContainer/TeamsDashboardContainer" activeStyle>
                    Teams
                </NavLink>
            </NavMenu>
        </Nav>
    </>
    );
};
 
export default Navigbar;
