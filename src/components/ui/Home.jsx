// Home.jsx
import React from 'react';
import Navbar from './shared/Navbar';
import { HeroSection } from './HeroSection';
import { CategoryCarousel } from './CategoryCarousel';  // Named import
import { LatestJobs } from './LatestJobs';

export const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      {/* <Footer/> */}
    </div>
  )
}
