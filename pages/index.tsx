import { Card, Layout, Container  } from '@/components/index';
import { MediaProvider } from '@/utils/media';
import { useCards } from '@/utils/cards'


export default function Home() {
  const { cards } = useCards()

  return (
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
  );
}


