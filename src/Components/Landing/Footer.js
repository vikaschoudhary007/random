import React from 'react';
import logo from '../../images/logo.svg';
import telegram from '../../images/telegram.png';
import medium from '../../images/medium.png';
import twitter from '../../images/twitter.png';
import versions from '../../images/versions.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    // <div>
    //   <footer>
    //     <div className="container">
    //       <div className="row align-items-center">
    //         <div className="col-lg-3">
    //           <Link className="footer_logo" to="/">
    //             <img src={logo} alt="logo" />
    //           </Link>
    //         </div>
    //         <div className="col-lg-9 d-flex flex-wrap align-items-center justify-content-lg-end">
    //           <a className="social" href="#" target="_blank">
    //             <img src={telegram} alt="Telegram" />
    //             Telegram Discussion
    //           </a>
    //           <a className="social" href="#" target="_blank">
    //             <img src={medium} alt="Medium" />
    //             Medium
    //           </a>
    //           <a className="social" href="#" target="_blank">
    //             <img src={twitter} alt="Twitter" />
    //             Twitter
    //           </a>
    //           <a className="social" href="#" target="_blank">
    //             <img src={versions} alt="Dot Coin" />
    //             Dot Coin
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
    <>
      <footer>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <Link className="footer_logo" to="/">
                <img src={logo} alt="logo" />
              </Link>
              <p className="copy">© 2021 Random Defi. All rights reserved.</p>
            </div>
            <div className="col-lg-8 d-flex flex-wrap align-items-center justify-content-lg-end">
              <a className="social" href="#" target="_blank">
                <img src={telegram} alt="Telegram" />
                Telegram Discussion
              </a>
              <a className="social" href="#" target="_blank">
                <img src={medium} alt="Medium" />
                Medium
              </a>
              <a className="social" href="#" target="_blank">
                <img src={twitter} alt="Twitter" />
                Twitter
              </a>
              <a className="social" href="#" target="_blank">
                <img src={versions} alt="Dot Coin" />
                Dot Coin
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
