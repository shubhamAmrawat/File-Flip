import React from 'react'
import NavigationBar from '../Components/NavigationBar';
import LandingSection from '../Components/LandingSection';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-t from-slate-50 to-red-50 bg-cover bg-center ">
      <NavigationBar />
      <LandingSection />
    </div>
  );
}

export default HomePage