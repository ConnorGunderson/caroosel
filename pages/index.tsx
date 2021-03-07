import { useAuth } from '@/lib/auth';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import { Card, Layout, Container } from '../components/index';
import fetcher from '@/utils/fetcher';
import { MediaProvider } from '@/utils/media';

const getCardContent = async (user) => {
  return await fetcher(`/api/user/${user.uid}`);
};

export default function Home() {
  const { user, loading } = useAuth();
  const [cardContent, setCardContent] = useState(defaultMedia);

  useEffect(() => {
    if (user && !loading) {
      getCardContent(user)
        .then((d: any) => {
          if (d.length) {
            setCardContent(d);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [user]);

  return (
    <div>
      <Layout>
        <Container gridSize={cardContent.length}>
          {cardContent.map((item, index) => {
            return (
              <MediaProvider key={index}>
                <Card
                  imageURL={item.imageURL}
                  audioURL={item.audioURL}
                />
              </MediaProvider>
            );
          })}
        </Container>
      </Layout>
    </div>
  );
}

let cardContent;

const defaultMedia = [
  {
    name: 'foo',
    audioURL: '/audio/grand-duel.mp3',
    imageURL: '/images/gbu.jpg'
  },
  {
    name: 'foo',
    audioURL: '/audio/undertale.mp3',
    imageURL: '/images/undertale.jpg'
  },
  {
    name: 'foo',
    audioURL: '/audio/pokemon.mp3',
    imageURL: '/images/pokemon.webp'
  }
];
