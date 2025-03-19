import React from "react";
import "./Footer.css"; // Import the CSS for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy;  {new Date().getFullYear()}  A.K.Giri ❤️ All rights reserved.</p>
    </footer>
  );
};

export default Footer;