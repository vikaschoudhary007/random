import React from 'react';
import launchapp from '../../images/launchapp.svg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Introduction() {
  return (
    <>
      <section class="padding-top h-100vh" id="Introduction">
        <div class="blur_bg"></div>
        <div class="container d-flex align-items-center justify-content-center">
          <div class="bnr_text">
            <h1 class="pb-3">Random Defi...Let’s Get Random!</h1>
            <p class="pb-3 pb-md-5">
              The DeFi space is full of copied and boring staking platforms.
              Random Defi aims to disrupt this space by injecting some good old
              fashion randomness when doling out your staking rewards. And the
              best part is, we’ll do this while providing a consistently high
              APY without inflating the supply!
            </p>
            <Link to="/dashboard" className="btn_blue">
              <img
                src={launchapp}
                alt="content"
                className="mr-2"
                width="42px"
              />
              Launch App
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
