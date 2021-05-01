import React, { useContext } from 'react';
import logo from '../../images/logo.svg';
import menu from '../../images/menu.png';
import arrowWhite from '../../images/arrow-white.svg';

import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Header() {
  const { connectTag, handleConnect } = useContext(UserContext);

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img src={menu} alt="menu" />
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link yellow" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link yellow" to="/choose_number">
                    Choose Number
                  </Link>
                </li>
                <li className="nav-item">
                  {/* <button
                    className="btn-white"
                    type="button"
                    onClick={handleConnect}
                  >
                    {!localStorage.account ? <>Connect</> : <>{connectTag}</>}
                  </button> */}
                  <button class="btn-gr" type="button" onClick={handleConnect}>
                    <img
                      src={arrowWhite}
                      alt="content"
                      class="mr-2"
                      width="15px"
                    />
                    <span>
                      {!localStorage.account ? <>Connect</> : <>{connectTag}</>}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
