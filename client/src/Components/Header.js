import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import Logo from "../Images/logo-t.png";
import { FaHome, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Tooltip } from "reactstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";

const Header = () => {

  const navigate= useNavigate();
  const dispatch = useDispatch();
  const handlelogout = async () => {
    dispatch(logout());
    //ensure that the state update from the logout action has been processed before proceeding to the next step.
    await new Promise((resolve) => setTimeout(resolve, 100));

    navigate("/"); //redirect to login page route.
  };

  return (
    <Container>
      <Navbar className="navigation" light expand="md">
        <Link to="/home" className="navs">
          <img src={Logo} className="logo" alt="Logo" />
        </Link>
        
          <Nav className="ms-auto" navbar>
            <NavItem>
              <Link to="/home" className="navs">
                Home
              </Link>
              
            </NavItem>
            <NavItem>
              <Link to="/profile" className="navs">
                Profile
              </Link>
              
            </NavItem>

            <NavItem>
          
              <Link onClick={handlelogout}>Logout</Link>
            </NavItem>
          </Nav>
       </Navbar>
    </Container>
  );
};

export default Header;
