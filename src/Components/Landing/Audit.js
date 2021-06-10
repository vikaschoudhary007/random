import React from 'react';
import presale from '../../images/presale.svg';

export default function Audit() {
  return (
    <>
      <section class="sec_5" id="Guaranteed-Liquidity">
        <div class="container">
          <div class="row flex-row-reverse">
            <div class="col-lg-8">
              <div class="f56-600 text-yellow pb-lg-5 pb-3">
                Who Likes Guaranteed Liquidity?
              </div>
              <div class="f16-600 text-white pb-3">
                To ensure our presale runs smoothly and that your funds are
                safe, we will be conducting our IDO on the Unilock.network
                platform.
              </div>
              <div class="f16-600 text-white pb-3">
                Unilock guarantees the locking of liquidity on Pancake Swap, so
                you can breathe easy knowing that there will be an instant
                market for people to buy and sell RAND.
              </div>
              <div class="f16-600 text-white">
                And of course our smart contracts will be audited and the audit
                report will be made available before the start of our IDO.
              </div>
            </div>
            <div class="col-lg-4 d-flex align-items-end">
              <div class="blueBox">
                <div class="f37-600 text-white pb-lg-5 pb-3">
                  BSC - Obviously!
                </div>
                <div class="f16-700 text-white">
                  Let’s face it – Ethereum gas fees are way out of control. We
                  have chosen to deploy our platform on Binance Smart Chain
                  (BSC) to allow everyone to join in on the fun. BSC gas fees
                  are just a tiny fraction of what they are on Ethereum. You can
                  literally stake on our platform for less than a cup of coffee!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="sec_6" id="Tokenomics-and-Presale">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="f56-600 text-yellow pb-lg-5 pb-3">Tokenomics</div>
              <label class="lable1 yellow">1,000,000 Initial Supply</label>
              <label class="lable1 yellow">600,000 Presale</label>
              <label class="lable1 yellow">50,000 Marketing</label>

              <label class="lable1 yellow">250,000 Pancakeswap Liquidity</label>
              <div class="row">
                <div class="col-md-6">
                  <label class="lable1 yellow">50,000 Liquidity Rewards</label>
                </div>
                <div class="col-md-6">
                  <label class="lable1 yellow">50,000 Team</label>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="f56-600 text-yellow pb-lg-5 pb-3">Presale</div>
              <label class="lable1 blue">
                Presale Date - Friday, May 14th at 10am EST
              </label>
              <label class="lable1 blue f d-flex ">
                Presale Location -{' '}
                <a href="https://unicrypt.network/amm/uni/ilos" target="_blank">
                  {' '}
                  Unicrypt.network
                </a>
              </label>
              <div class="row">
                <div class="col-md-6">
                  <label class="lable1 blue">Presale - 300 RAND per BNB</label>
                </div>
                <div class="col-md-6">
                  <label class="lable1 blue">
                    Pancakeswap Listing - 250 RAND per BNB
                  </label>
                </div>
                <div class="col-md-6">
                  <label class="lable1 blue">Softcap - 500 BNB</label>
                </div>
                <div class="col-md-6">
                  <label class="lable1 blue">Hardcap - 2,000 BNB</label>
                </div>
                <div class="col-md-6">
                  <label class="lable1 blue">Min 1 BNB</label>
                </div>
                <div class="col-md-6">
                  <label class="lable1 blue">Max 20 BNB</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="sec_7" id="Roadmap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="f56-600 text-white pb-lg-5 pb-4">Roadmap</div>
            </div>
            <div class="col-lg-4">
              <div class="box1">
                <div class="Roadmap_number1">Q1</div>
                <ul class="listroadMap">
                  <li>Initial concept design</li>
                  <li>coding of smart contracts</li>
                  <li>platform design and development</li>
                  <li>beta testing</li>
                  <li>audit of smart contracts by reputable audit firm</li>
                  <li>deploy smart contracts onto BSC mainnet</li>
                  <li>platform beta launch</li>
                  <li>locking of team tokens</li>
                  <li>conduct presale on Unicrypt</li>
                  <li>liquidity locking</li>
                  <li>Pancakeswap exchange listing</li>
                  <li>Launch Community-Driven Marketing Campaign</li>
                  <li>CoinMarketCap Listing</li>
                  <li>Coin Gecko listing</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="box1">
                <div class="Roadmap_number2">02</div>
                <ul class="listroadMap">
                  <li>application upgrades and improvements</li>
                  <li>
                    integrate additional wallets (our platform currently
                    supports Metamask)
                  </li>
                  <li>integrate an APY calculator</li>
                  <li>commence liquidity rewards program</li>
                  <li>DEX listing</li>
                  <li>
                    integration of pools to other BEP20 tokens to stake within
                    random pools with a network fee
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="box1 mb-0">
                <div class="Roadmap_number3">03</div>
                <ul class="listroadMap">
                  <li>expand rewards To Include NFTs</li>
                  <li>
                    create a governance mechanism to determine how best to use
                    RAND that has been set aside for future use cases
                  </li>
                  <li>more to come..</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="sec_8" id="Audit">
        <div class="container">
          <div class="row flex-row-reverse">
            <div class="col-md-3 d-flex justify-content-md-end">
              <img src={presale} alt="presale" class="mb-3" />
            </div>
            <div class="col-md-9">
              <div class="f56-600 text-white pb-3">Audit</div>
              <div class="f16-400 text-white">Coming soon...</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
