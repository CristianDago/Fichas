import React, { useState } from "react";
import { useAuth } from "../../auth/auth.context";
import { useNavigate } from "react-router-dom";
import css from "../../../assets/styles/components/navbar.module.scss"; // Nuevo CSS para la Navbar
import logo from "../../../assets/images/logo-blanco.webp"; // Asumo que esta ruta del logo es correcta
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faIdCard,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleItemClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={css.navbar}>
      <div className={css.brandContainer}>
        <img src={logo} alt="Clínica logo" className={css.logo} />
        <h1 className={css.title}>Clínica Trasandina</h1>
      </div>

      <button className={css.menuToggle} onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      <ul className={`${css.navbarNav} ${isMenuOpen ? css.open : ""}`}>
        <li onClick={() => handleItemClick("/dashboard/add-patient")}>
          <FontAwesomeIcon icon={faUser} className={css.icon} /> Agregar
          paciente
        </li>
        <li onClick={() => handleItemClick("/dashboard/records")}>
          <FontAwesomeIcon icon={faIdCard} className={css.icon} /> Fichas
          Clínicas
        </li>
        <li>
          <button onClick={handleLogout} className={css.logoutButton}>
            <FontAwesomeIcon icon={faSignOutAlt} className={css.icon} /> Salir
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
