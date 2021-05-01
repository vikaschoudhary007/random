import React, { useContext } from 'react';
import logo from '../../images/logo.svg';
import menu from '../../images/menu.png';
import arrowWhite from '../../images/arrow-white.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Header() {
  const { connectTag, handleConnect } = useContext(UserContext);

  return (
    <div>
      <header class="header">
        <div class="container">
          <nav class="navbar navbar-expand-lg">
            <Link class="navbar-brand" to="/">
              <img src={logo} alt="logo" />
            </Link>
            <button
              class="navbar-toggler"
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
              class="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-link yellow active" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link yellow" to="/choose_number">
                    Choose Number
                  </Link>
                </li>
                <li class="nav-item">
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
    </div>
  );
}
