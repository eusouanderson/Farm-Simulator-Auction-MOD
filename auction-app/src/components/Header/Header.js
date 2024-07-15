
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/logo.png'; 
import './Header.css';

const Header = () => (
    <header className="header">
        <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <p className="site-title">Farm Simulator Leilão</p>
        </div>
        <nav>
            <ul>
                <li><Link to="/">Início</Link></li>
                <li><Link to="euro-page">Euro Truck</Link></li>
                <li><a href="https://github.com/eusouanderson" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;
