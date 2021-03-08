import { Card, Layout, Container  } from '@/components/index';
import { MediaProvider } from '@/utils/media';
import { useEffect } from 'react';



export default function Home() {

  useEffect(() => {
    // getCards().then((audio) => {
    //   audio.load()
    //   audio.play()
    // })
  }, [])

  return (
    <div>
      <Layout>
        <Container gridSize={defaultMedia.length}>
          {defaultMedia.map((card , index) => {
            return (
              <MediaProvider key={index}>
                <Card name={card.name} imageURL={card.imageURL} audioURL={card.audioURL} />
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
    name: 'cappadocia',
    audioURL: '/audio/cappadocia.mp3',
    imageURL: '/images/hot-air-balloon.png'
  },
  {
    name: 'river',
    audioURL: '/audio/river.mp3',
    imageURL: '/images/river.png'
  },
  {
    name: 'rain',
    audioURL: '/audio/rain.mp3',
    imageURL: '/images/rain.png'
  }
];
