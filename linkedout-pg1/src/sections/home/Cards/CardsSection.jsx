import React from 'react';
import SectionStatCard from './SectionStatCard';
import CARDS_DATA from './cards.data';

// Renders the whole cards section from data
export default function CardsSection({ carouselImages }) {
  return (
    <div className="mt-24 space-y-16 px-4">
      {CARDS_DATA.map((card, index) => (
        <SectionStatCard key={card.title} card={card} index={index} carouselImages={carouselImages} />
      ))}
    </div>
  );
}
