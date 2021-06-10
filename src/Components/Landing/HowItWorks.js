import React from 'react';
import downArrowWhite from '../../images/downArrowWhite.svg';

export default function HowItWorks() {
  return (
    <>
      <section class="sec_2" id="who-Hates-Inflation">
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <div class="blackBox">
                <div class="f56-600 text-yellow pb-lg-5 pb-3">
                  Who Hates Inflation?
                </div>
                <div class="f16-600 text-white pb-3">
                  The key mechanic that allows us to prevent inflation is our
                  burn function.
                </div>
                <div class="f16-600 text-white pb-3">
                  We’ll be putting the torch to 2% of every transaction, in
                  order to stabilize the supply and prevent inflation.
                </div>
                <div class="f16-600 text-white">
                  Our burn rate will provide the opportunity for our circulating
                  supply to decrease despite the emissions rate, which will
                  serve to increase your APY over time.
                </div>
              </div>
            </div>
            <div class="col-lg-7">
              <img
                src={downArrowWhite}
                alt="Arrow"
                class="down pt-3 pb-3 pb-lg-5"
              />
              <div class="f56-600 text-white pb-lg-5 pb-3">
                Alright Folks, Let’s get Random!
              </div>
              <div class="f16-600 text-white pb-3">
                Token holders in possession of at least 100 of our native token,
                RAND, can stake their tokens to have a chance to be randomly
                rewarded with free RAND!
              </div>
              <div class="f16-600 text-white pb-3">
                Twice daily we will be randomly rewarding one lucky holder with
                850 RAND for free! All you have to do is stake your RAND on our
                platform and choose your numbers.
              </div>
              <div class="f16-600 text-white pb-3">
                Our platform contains 10,000 numbers for you to chose from.
                That’s right...I said 10,000!
              </div>
              <div class="f16-600 text-white pb-3">
                For every 100 RAND that you stake on our platform, you will be
                allowed to choose one number. There is no limit to how much RAND
                you can stake or how many numbers you can choose or how many
                times you can win!
              </div>
              <div class="f16-600 text-white pb-3">
                While we’re pretty sure most people will stake more than 100
                RAND and thus be choosing multiple numbers, we wanted to allow
                even our smallest holders to participate. Rewards for everyone!
                (Well, for the winners at least)
              </div>
              <div class="f16-600 text-white">
                For more on how to stake on our platform, see our staking guide
                here.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
