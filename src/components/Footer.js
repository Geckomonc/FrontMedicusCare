import React from "react";
import { FaInstagram, FaTwitterSquare , FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <FaInstagram /> <FaTwitterSquare  /> <FaFacebookSquare /> <FaLinkedin />
      </div>
      <p> &copy; 2024</p>
    </div>
  );
}

export default Footer;