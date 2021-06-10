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
      {/* <header className="header">
        <div className="container">
          <nav className="navbar navbar-expand-lg d-flex justify-content-between">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="logo" />
            </Link>
            <button className="btn-gr" type="button" onClick={handleConnect}>
              <img
                src={arrowWhite}
                alt="content"
                className="mr-2"
                width="15px"
              />
              <span>
                {!localStorage.account ? <>Connect</> : <>{connectTag}</>}
              </span>
            </button>
          </nav>
        </div>
      </header> */}
      <header class="header">
        <div class="container">
          <nav class="navbar navbar-expand-xl">
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
              <ul class="navbar-nav homeNav">
                <li class="nav-item">
                  <a class="nav-link page-scroll" href="#who-Hates-Inflation">
                    Who Hates Inflation?
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link page-scroll"
                    href="#But-How-Much-Can-I-Make"
                  >
                    But How Much Can I Make?
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link page-scroll"
                    href="#Did-Somebody-Say-Marketing"
                  >
                    Did Somebody Say Marketing?
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link page-scroll" href="#Guaranteed-Liquidity">
                    Guaranteed Liquidity
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link page-scroll"
                    href="#Tokenomics-and-Presale"
                  >
                    Tokenomics and Presale
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link page-scroll" href="#Roadmap">
                    Roadmap
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link page-scroll" href="#Audit">
                    Audit
                  </a>
                </li>
                {/* <li class="nav-item">
                                <button class="btn-gr" type="button">
                                    <img src="./images/arrow-white.svg" alt="content" class="mr-2" width="15px" />
                                    <span>Connect</span></button>
                            </li> */}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
