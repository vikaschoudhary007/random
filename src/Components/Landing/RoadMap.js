import React from 'react';
import downArrowBlue from '../../images/downArrowBlue.svg';

export default function RoadMap() {
  return (
    <>
      <section className="sec_4">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="f56-600 text-yellow pb-lg-5 pb-3">
                Did Somebody Say Marketing?
              </div>
              <div className="f16-600 text-white pb-3">
                Here at Random Defi, we believe that building a strong community
                is the key to success with any DeFi project. We’ve spent
                considerable amounts of time researching what communities in
                this space value.
              </div>
              <div className="f16-600 text-white pb-3">
                One thing that surfaced over and over again was marketing.
                Community members such as yourself want to know how a team plans
                to grow their user base over time.
              </div>
              <div className="f16-600 text-white pb-3">
                So we’ve decided to make marketing a focal point of our
                community engagement. To accomplish this, we will be allocating
                $100,000 USD to help spread the word about Random. That’s a lot
                of marketing!
              </div>
              <div className="f16-600 text-white pb-3">
                And the best part is: You, the community, will decide how this
                money is spent!
              </div>
              <div className="f16-600 text-white pb-3">
                Following the completion of our IDO, we will hold a community
                round table, where we will listen to your ideas on how best to
                spend our marketing budget.
              </div>
              <div className="f16-600 text-white">
                We will then conduct a poll in our Telegram chat each week,
                where the community will vote on how best to market the project.
                Now that's what I call community engagement!
              </div>
            </div>
            <div className="col-lg-5">
              <div className="yellowBox">
                <img
                  src={downArrowBlue}
                  alt="Arrow"
                  className="down pt-lg-5 pb-3 pb-lg-5"
                />
                <div className="f56-600 text-blue pb-lg-5 pb-3">
                  About that Emissions Rate..
                </div>
                <div className="f16-600 text-blue pb-3">
                  Each week the contract will emit 1.2% of the starting supply
                  to be used as staking rewards. Like we mentioned above, this
                  will be more than offset by the burn function.
                </div>
                <div className="f16-600 text-blue">
                  5% of the 1.2% will be set aside for future use cases that
                  will be decided by the community in a similar fashion to the
                  marketing. This could be put towards marketing or further
                  staking rewards or whatever other crazy ideas our holders come
                  up with!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
