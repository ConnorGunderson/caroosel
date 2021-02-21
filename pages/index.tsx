import { Card, Layout, Container} from '../components/index'
import GlobalSettings from '../components/GlobalSettings'
import React from 'react'

const cardContent = [
  {
    audio: "/audio/grand-duel.mp3",
    image: "/images/gbu.jpg"
  },
  {
    audio: "/audio/undertale.mp3",
    image: "/images/undertale.jpg"
  },
  {
    audio: "/audio/undertale.mp3",
    image: "/images/undertale.jpg"
  },
  {
    audio: "/audio/undertale.mp3",
    image: "/images/undertale.jpg"
  },
  {
    audio: "/audio/pokemon.mp3",
    image: "/images/pokemon.webp"
  }
]

const GlobalVolumeContext = React.createContext(50)

export default function Home() {
  return (
    <>
      <Layout>
        {/* <Container className={"mx-auto border-2"}>
          <GlobalSettings />
        </Container> */}
        <Container gridSize={cardContent.length}>
          { 
            cardContent.map((item, index) => {
              return <Card key={index} imageUrl={item.image} audioUrl={item.audio}/>
            })
          }
        </Container>
      </Layout>
    </>
  )
}