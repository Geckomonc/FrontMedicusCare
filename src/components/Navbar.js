import React, { useState } from "react";
import Logo from "../assets/carpeta.png";
import { Link } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <div className="hiddenLinks">
          <Link to="/"> Inicio </Link>
          <Link to="/about"> Acerca de Nosotros </Link>
          <Link to="/contact"> Contáctanos </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Inicio </Link>
        <Link to="/about"> Acerca de nosotros</Link>
        <Link to="/contact"> Contáctanos  </Link>
        <button onClick={toggleNavbar}>
          <FaBeer />
        </button>
      </div>
    </div>
  );
}

export default Navbar;