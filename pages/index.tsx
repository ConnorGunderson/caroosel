import { useAuth } from '@/lib/auth';
import React, { useEffect, useState } from 'react';

import { Card, Layout, Container  } from '@/components/index';
import { } from "@/components/Container"
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
                <Card imageURL={item.imageURL} audioURL={item.audioURL} />
              </MediaProvider>
            );
          })}
        </Container>
      </Layout>
    </div>
  );
}

const defaultMedia = [
  {
    name: 'foo',
    audioURL: '/audio/grand-duel.mp3',
    imageURL: '/images/gbu.jpeg'
  },
  {
    name: 'foo',
    audioURL: '/audio/undertale.mp3',
    imageURL: '/images/undertale.jpeg'
  },
  {
    name: 'foo',
    audioURL: '/audio/pokemon.mp3',
    imageURL: '/images/pokemon.png'
  }
];
