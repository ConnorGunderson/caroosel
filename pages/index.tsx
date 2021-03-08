import { Card, Layout, Container  } from '@/components/index';
import { MediaProvider } from '@/utils/media';
import { useEffect } from 'react';
import { useCards } from '@/utils/cards'


export default function Home() {
  const { cards } = useCards()
  useEffect(() => {
    // getCards().then((audio) => {
    //   audio.load()
    //   audio.play()
    // })
  }, [])

  return (
    <div>
      <Layout>
        <Container gridSize={cards.length}>
          {cards.map((card , index) => {
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


