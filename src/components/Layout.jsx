// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import the Footer component
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer /> {/* Add Footer here */}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
