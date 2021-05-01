import React from 'react';
export default function Audit() {
  return (
    <>
      <section className="sec_5">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-8">
              <div className="f56-600 text-yellow pb-lg-5 pb-3">
                Who Likes Guaranteed Liquidity?
              </div>
              <div className="f16-600 text-white pb-3">
                To ensure our presale runs smoothly and that your funds are
                safe, we will be conducting our IDO on the Unilock.network
                platform.
              </div>
              <div className="f16-600 text-white pb-3">
                Unilock guarantees the locking of liquidity on Pancake Swap, so
                you can breathe easy knowing that there will be an instant
                market for people to buy and sell RAND.
              </div>
              <div className="f16-600 text-white">
                And of course our smart contracts will be audited and the audit
                report will be made available before the start of our IDO.
              </div>
            </div>
            <div className="col-lg-4 d-flex align-items-end">
              <div className="blueBox">
                <div className="f37-600 text-white pb-lg-5 pb-3">
                  BSC - Obviously!
                </div>
                <div className="f16-700 text-white">
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
      <section className="sec_6">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="f56-600 text-yellow pb-lg-5 pb-3">Tokenomics</div>
              <label className="lable1 yellow">1,000,000 Initial Supply</label>
              <label className="lable1 yellow">600,000 PreSale</label>
              <label className="lable1 yellow">
                250,000 Pancakeswap Liquidity
              </label>
              <div className="row">
                <div className="col-md-6">
                  <label className="lable1 yellow">
                    50,000 Liquidity Rewards
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="lable1 yellow">50,000 Team</label>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="f56-600 text-yellow pb-lg-5 pb-3">Presale</div>
              <label className="lable1 blue">
                Presale Date - Friday, May 14th at 10am EST
              </label>
              <label className="lable1 blue flex-column align-items-start justify-content-center">
                Presale Location - Unicrypt.network (make this a link to here:
                <a href="https://unicrypt.network/amm/uni/ilos" target="_blank">
                  https://unicrypt.network/amm/uni/ilos)
                </a>
              </label>
              <div className="row">
                <div className="col-md-6">
                  <label className="lable1 blue">
                    Presale - 300 RAND per BNB
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="lable1 blue">
                    Pancakeswap Listing - 250 RAND per BNB
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="lable1 blue">Hardcap - 2,000 BNB</label>
                </div>
                <div className="col-md-6">
                  <label className="lable1 blue">Hardcap - 2,000 BNB</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec_7">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="f56-600 text-white pb-lg-5 pb-4">Roadmap</div>
            </div>
            <div className="col-lg-4">
              <div className="box1">
                <div className="Roadmap_number1">Q1</div>
                <ul className="listroadMap">
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
                  <li>launch community-driven marketing campaign</li>
                  <li>CoinMarketCap Listing</li>
                  <li>Coin Gecko listing</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box1">
                <div className="Roadmap_number2">02</div>
                <ul className="listroadMap">
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
            <div className="col-lg-4">
              <div className="box1 mb-0">
                <div className="Roadmap_number3">03</div>
                <ul className="listroadMap">
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
    </>
  );
}
