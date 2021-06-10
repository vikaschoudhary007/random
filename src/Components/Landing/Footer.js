import React from 'react';
import logo from '../../images/logo.svg';
import telegram from '../../images/telegram.png';
import medium from '../../images/medium.png';
import twitter from '../../images/twitter.png';
import versions from '../../images/versions.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-4">
              <a class="footer_logo" href="index.html">
                <img src={logo} alt="logo" />
              </a>
              <p class="copy">© 2021 Random Defi. All rights reserved.</p>
            </div>
            <div class="col-lg-8 d-flex flex-wrap align-items-center justify-content-lg-end">
              <a class="social" href="https://t.me/RandomDeFi" target="_blank">
                <img src={telegram} alt="Telegram" />
                Telegram Chat
              </a>
              <a
                class="social"
                href="https://t.me/RandomDeFiNews"
                target="_blank"
              >
                <img src={telegram} alt="Telegram" />
                Telegram News
              </a>

              {/* <a class="social" href="#" target="_blank"><img src="images/medium.png"
                                alt="Medium" />Medium</a>  */}
              <a
                class="social"
                href="Https://twitter.com/RandomDeFi"
                target="_blank"
              >
                <img src={twitter} alt="Twitter" />
                Twitter
              </a>
              {/* <a class="social" href="#" target="_blank"><img src="images/versions.png" alt="Dot Coin" />Dot
                            Coin</a> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
