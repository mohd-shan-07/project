import React from 'react';
import CinematicHero from '../components/hero/CinematicHero';
import ServiceMarquee from '../components/sections/ServiceMarquee';
import SelectedWork from '../components/SelectedWork';
import Clients from '../components/Clients';
import Outcomes from '../components/Outcomes';
import About from '../components/About';
import Contact from '../components/Contact';
import { useLenis } from '../hooks/useLenis';

const Home: React.FC = () => {
  // Initialize Lenis smooth scroll globally for the home page
  useLenis();

  return (
    <main>
      <CinematicHero />
      <ServiceMarquee />
      <SelectedWork />
      <Clients />
      <Outcomes />
      <About />
      <Contact />
    </main>
  );
};

export default Home;
