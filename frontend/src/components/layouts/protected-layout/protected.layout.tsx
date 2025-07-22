import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import layoutCss from "../../../assets/styles/layout/protected.layout.module.scss";

const ProtectedLayout: React.FC = () => {
  return (
    <div className={layoutCss.protectedLayout}>
      <Navbar />
      <main className={layoutCss.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
