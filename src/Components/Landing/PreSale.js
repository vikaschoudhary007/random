import React from 'react';
import image from '../../images/image.png';

export default function PreSale() {
  return (
    <>
      <section className="sec_3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="f56-600 text-yellow pb-lg-5 pb-3">
                But How Much Can I Make?
              </div>
              <div className="f16-600 text-white pb-3">
                Okay, okay. Here’s some boring numbers for you. I promise to
                reward you with a sweet pic of some hot chicks when we’re done.
              </div>
              <div className="f16-600 text-white pb-3">
                First, let’s assume you purchased RAND in our presale. Next, we
                have to choose some values for our variables. (Feel free to
                reach out to one of our Admins if you need any help calculating
                your APY)
              </div>
              <div className="f16-600 text-white pb-3">
                Percentage of starting circulating supply currently being
                staked: 25% (212,500 RAND) Emissions: 624,000 RAND per year
              </div>
              <div className="row py-md-5 py-3">
                <div className="col-md-4">
                  <div className="ScenarioBox">
                    <div className="border-bottom d-flex p-3 align-items-center justify-content-between">
                      <div className="f17-900 text-uppercase text-purple">
                        Scenario
                      </div>
                      <div className="number_scenario1">#1</div>
                    </div>
                    <div className="p-3">
                      <div className="f16-600">
                        The current price of RAND is the same as it was during
                        the Presale:{' '}
                        <span className="f16-700">
                          624,000 / 212,500 = 294 APY
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="ScenarioBox">
                    <div className="border-bottom d-flex p-3 align-items-center justify-content-between">
                      <div className="f17-900 text-uppercase text-green">
                        Scenario
                      </div>
                      <div className="number_scenario2">#2</div>
                    </div>
                    <div className="p-3">
                      <div className="f16-600">
                        The current price of RAND is 50% higher than the Presale
                        price:{' '}
                        <span className="f16-700">294% x 1.5 = 376%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="ScenarioBox">
                    <div className="border-bottom d-flex p-3 align-items-center justify-content-between">
                      <div className="f17-900 text-uppercase text-orange">
                        Scenario
                      </div>
                      <div className="number_scenario3">#3</div>
                    </div>
                    <div className="p-3">
                      <div className="f16-600">
                        The current price of RAND is 50% lower than the Presale
                        price: <span className="f16-700">294% / 2 = 122%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="f16-600 text-white pb-3">
                WTF!? Why would you even mention this last scenario? Back off,
                bro. I’m just being thorough. Also, an APY of 122% is nothing to
                sneeze at.
              </div>
              <div className="f16-600 text-white pb-3">
                And, as promised, here is a pic of some hot chicks.
              </div>
              <div className="image mt-3 mt-md-5">
                <img src={image} alt="image" className="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
