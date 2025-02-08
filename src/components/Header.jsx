import React from "react";
import { FaUsers } from "react-icons/fa";
import '../styles/style.scss'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <FaUsers className="logo" />
        <h1>User Profiles</h1>
      </div>
    </header>
  );
};

export default Header;
