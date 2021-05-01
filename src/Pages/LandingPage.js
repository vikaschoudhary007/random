import React from 'react';
import Header from '../Components/Landing/Header';
import Introduction from '../Components/Landing/Introduction';
import HowItWorks from '../Components/Landing/HowItWorks';
import PreSale from '../Components/Landing/PreSale';
import RoadMap from '../Components/Landing/RoadMap';
import Audit from '../Components/Landing/Audit';
import Footer from '../Components/Landing/Footer';

export default function LandingPage() {
  return (
    <div className="homePage">
      <Header />
      <Introduction />
      <HowItWorks />
      <PreSale />
      <RoadMap />
      <Audit />
      <Footer />
    </div>
  );
}
