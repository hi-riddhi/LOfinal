import React from 'react';
import CommunityHeader from '../components/community/CommunityHeader';
import CommunityHero from '../components/community/CommunityHero';
import CommunityStatistics from '../components/community/CommunityStatistics';
import CommunityPastEvents from '../components/community/CommunityPastEvents';
import CommunitySpeakerSessions from '../components/community/CommunitySpeakerSessions';
import CommunitySection from '../components/community/CommunitySection';
import CommunityFooter from '../components/community/CommunityFooter';
import CommunityGlobalBackground from '../components/community/CommunityGlobalBackground';
import CommunityScrollProgress from '../components/community/CommunityScrollProgress';
import '../components/community/animations.css';

function CommunityPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <CommunityScrollProgress />
      <CommunityGlobalBackground />
      <CommunityHeader />
      <div className="relative z-10">
        <CommunityHero />
        <CommunityStatistics />
        <CommunityPastEvents />
        <CommunitySpeakerSessions />
        <CommunitySection />
        <CommunityFooter />
      </div>
    </div>
  );
}

export default CommunityPage;
