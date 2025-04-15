import React from 'react'
import NavigationBar from '../Components/NavigationBar';
import LandingSection from '../Components/LandingSection';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <NavigationBar />
      <LandingSection />
    </div>
  );
}

export default HomePage