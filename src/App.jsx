import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/authProvider"; // Ensure the correct path to AuthProvider
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AuthProvider>
  );
}

export default App;
