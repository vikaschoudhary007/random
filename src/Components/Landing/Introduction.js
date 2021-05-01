import React from 'react';
import launchapp from '../../images/launchapp.svg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Introduction() {
  return (
    <>
      <section className="padding-top h-100vh" id="Introduction">
        <div className="blur_bg"></div>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="bnr_text">
            <h1 className="pb-3">Random Defi...Let’s Get Random!</h1>
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
            {/* <button
              onClick={() => {
                Swal.fire({
                  width: 400,
                  background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,
                  iconColor: '#008080',
                  title: `<span style='color:white'>Added Successfully</span>`,
                  showConfirmButton: true,
                  showCloseButton: false,
                  confirmButtonText: 'Close',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'swal-button',
                    loader: 'swal-loader',
                  },
                  buttonsStyling: false,
                  onOpen: () => {
                    Swal.showLoading();
                  },
                });
              }}
            >
              {' '}
              Hmllo
            </button> */}
          </div>
        </div>
      </section>
    </>
  );
}
