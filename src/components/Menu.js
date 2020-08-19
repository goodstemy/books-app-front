import React, { useState, useEffect } from 'react';
import {
    Link, withRouter
} from "react-router-dom";

function Menu({isAuthorized, logout}) {
    const [isActive, setIsActive] = useState(true);
    const [scrollTop, setScrollTop] = useState(0);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const onScroll = e => {
            const {scrollTop} = e.target.documentElement;

            setScrollTop(scrollTop);
        };

        window.addEventListener("scroll", onScroll);

        if (scrollTop < lastScrollPosition) {
            setLastScrollPosition(scrollTop + 50);
            return setIsActive(true);
        }

        setLastScrollPosition(scrollTop);

        if (scrollTop > 200) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);

    return (
        <div style={{height: '100%', position: 'absolute'}}>
            <div className="aside"></div>
            {isAuthorized ?
                <div className={`menu ${isActive ? 'menu-active' : 'menu-inactive'}`}>
                    <li>
                        <Link to="/">КНИГИ</Link>
                    </li>
                    <li>
                        <Link to="/profile">ПРОФИЛЬ</Link>
                    </li>
                    <li>
                        <a style={{cursor: 'pointer'}} onClick={logout}>ВЫХОД</a>
                    </li>
                </div>
                :
                <div className={`menu ${isActive ? 'menu-active' : 'menu-inactive'}`}>
                    <li>
                        <Link to="/login">ВОЙТИ</Link>
                    </li>
                    <li>
                        <Link to="/signup">РЕГИСТРАЦИЯ</Link>
                    </li>
                </div>
            }
        </div>
    );
}

export default withRouter(Menu);
