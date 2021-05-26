import React, { useState } from 'react';
import { Box, Grommet, Main, Text } from 'grommet';

import SliderCard from './components/SliderCard';
import ItemCard from './components/ItemCard';

const theme = {
  themeMode: 'dark',
  global: {
    font: {
      family: `-apple-system, BlinkMacSystemFont, "Segoe UI"`,
    },
  },
  card: {
    container: {
      background: '#FFFFFF12',
      elevation: 'none',
    },
    footer: {
      pad: { horizontal: 'medium', vertical: 'small' },
      background: '#FFFFFF06',
    },
  },
};

const App = () => {

  const [cards] = useState([
    { imageUrl: '/assest/ana-de-armas.jpg', title: 'Ana de Armas', subtitle: 'Cuban-Spanish actress', from: 200, last24Hours: false },
    { imageUrl: '/assest/eddie-murphy.jpg', title: 'Eddie Murphy', subtitle: 'American actor, comedian, writer, producer, and singer', from: 999, last24Hours: false },
    { imageUrl: '/assest/nicolas-cage.jpg', title: 'Nicolas Cage', subtitle: 'American actor and filmmaker', from: 499, last24Hours: true },
    { imageUrl: '/assest/salma-hayek.jpg', title: 'Salma Hayek', subtitle: 'Mexican and American film actress and producer', from: 200, last24Hours: true },
    { imageUrl: '/assest/emma-watson.jpg', title: 'Emma Watson', subtitle: 'English actress, model, and activist', from: 475, last24Hours: true },
    { imageUrl: '/assest/johnny-depp.jpg', title: 'Johnny Depp', subtitle: 'American actor, producer, and musician', from: 750, last24Hours: true },
    { imageUrl: '/assest/nicolas-cage.jpg', title: 'Nicolas Cage', subtitle: 'American actor and filmmaker', from: 499, last24Hours: true },
    { imageUrl: '/assest/salma-hayek.jpg', title: 'Salma Hayek', subtitle: 'Mexican and American film actress and producer', from: 200, last24Hours: true },
  ])

  return (
    <Grommet theme={theme} full >

      <Main background="dark-2" pad="large">

        <SliderCard
          width="80%"
          margin="auto"
          pad="medium"
          background="dark-1"
          stepWidth={100}
          title="Recently viewed"
        >
          {cards && cards.map((item, index) => (
            <ItemCard {...item} />
          ))}
        </SliderCard>

        {/* <Box
      >
      <div style={{minWidth:'50px', background:'red'}}></div>
      <Box pad="medium" background="dark-2" />
      <Box pad="medium" background="light-1" />
      <Box pad="medium" background="light-2" />
      <Box pad="medium" background="light-3" />
    </Box> */}

      </Main>
    </Grommet >
  );
}

export default App;
