
import { Button, Space } from "antd";
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "./helpers";



import {useRef} from 'react';
import {FaBars, FaTimes} from "react-icons/fa";
import "../style/nav.css";

const NavBar = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();


    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    const handleLogout = () => {
        removeToken();
        window.location.reload();
        navigate("./", { replace: true });
    };

    

    return (
        <header>
            <h3>Pizza-jérome</h3>
            <nav ref={navRef}>
                <a href='./'>Accueil</a>
                <a href='/reservation'>Réservation</a>
                {user ? (
                    <> {console.log(user)}
                        <a href="/profile">{user.username}</a>
                        <a
                            // style cursor pointer
                            style={{ cursor: "pointer" }}

                            className="auth_button_signUp"
                            type="primary"
                            onClick={handleLogout}
                        >
                            Logout
                        </a>
                    </>
                ) :( 
                <>
                    <a href='/connexion'>Connexion</a>
                    <a href='/inscription'>inscription</a>
                </>
                )}
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars />
            </button>
         </header>   

    );
};

export default NavBar;