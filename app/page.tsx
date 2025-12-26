import React from 'react';
import Banner from '../components/Banner';
import HeroSection from '../components/HeroSection';
import TaskFlowCTA from '../components/TaskFlowCTA';
import EnterpriseCTA from '../components/EnterpriseCTA';
import QuickLinks from '../components/QuickLinks';
import ScrollableBar from '../components/ScrollableBar';
import ContentSection from '../components/ContentSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Banner />
      <HeroSection />
      <QuickLinks />
      <ScrollableBar />
       <TaskFlowCTA />
       <EnterpriseCTA />
      <ContentSection />
      <Footer />
    </main>
  );
}
