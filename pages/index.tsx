import { Card, Layout, Container  } from '@/components/index';
import { MediaProvider } from '@/utils/media';
import { useCards } from '@/utils/cards';
import { useEffect } from 'react';



export default function Home() {
  const {cards, getCards, cardLoading} = useCards()

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
