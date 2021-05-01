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
      </header>
    </>
  );
}
