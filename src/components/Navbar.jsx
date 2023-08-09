import React, { useState } from 'react';
import { Link } from "react-router-dom"
import logo from '../assets/muscle-logo.png';
import {bars} from 'react-icons-kit/fa/bars'
import {close} from 'react-icons-kit/fa/close'
import Icon from 'react-icons-kit';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const Navbar = () => {
    const [active, setActive] = useState(false);

    const { user } = useAuthContext();

    const handleClick = () => {
        setActive(!active);
    }

    const { logout } = useLogout();

    const handleLogout = () => {
        logout()
    }

        return(
            <nav className="NavBarItems">
                <div className='logo-section'>
                    <Link to='/' style={{
                        color:"black",
                        cursor:"pointer",
                        textDecoration: "none"
                    }}>
                        <img src={logo} height={50} style={{aspectRatio:"4/3", objectFit: "contain"}} alt='logo'/>
                    </Link>
                    <h1 className="navbar-logo">
                        <Link to='/' style={{
                            color:"black",
                            cursor:"pointer",
                            textDecoration: "none"
                        }}>
                            Liceria
                        </Link>
                    </h1>
                </div>
                <div className="menu-icon" onClick={handleClick}>
                    <i style={{color: "#fff", transition:"0.5 all ease"}} className= {active ? 'fas fa-times' : bars}></i>
                    <Icon size={25} icon={active ? close : bars}/>
                </div>
                <ul className={active ? 'nav-menu-active' : 'nav-menu'}>
                    {user && (
                        <li className= "menuItems" > 
                            <div className='nav-buttons-container'>
                                <span><strong>Logged In As: </strong>{user.email}</span>
                                <a href='/' className="nav-links-mobile" onClick={handleLogout}>Logout</a>
                            </div>
                        </li>
                    )}
                    {!user && (
                        <div className='nav-buttons-container'>
                            <li className= "menuItems" >
                                <a href='/login' className="nav-links-mobile">Login</a>
                            </li>
                            <li className="menuItems">
                                <a href='/signup' className="nav-links-mobile">Signup</a>
                            </li>
                        </div> 
                    )} 
                </ul>
                
            </nav>
        );
    
}

export default Navbar