import React from 'react';

import { Card, Layout, Container } from '../components/index';

export default function Home() {
  return (
    <>
      <Layout>
        <Container gridSize={cardContent.length}>
          {cardContent.map((item, index) => {
            return (
              <Card key={index} imageUrl={item.image} audioUrl={item.audio} />
            );
          })}
        </Container>
      </Layout>
    </>
  );
}

const cardContent = [
  {
    audio: '/audio/grand-duel.mp3',
    image: '/images/gbu.jpg'
  },
  {
    audio: '/audio/undertale.mp3',
    image: '/images/undertale.jpg'
  },
  {
    audio: '/audio/undertale.mp3',
    image: '/images/undertale.jpg'
  },
  {
    audio: '/audio/undertale.mp3',
    image: '/images/undertale.jpg'
  },
  {
    audio: '/audio/pokemon.mp3',
    image: '/images/pokemon.webp'
  }
];
