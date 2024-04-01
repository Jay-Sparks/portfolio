import React from 'react'

import styled from 'styled-components'
import { a } from 'react-spring'
import items from './Items.jsx'

const Main = styled.div`
  height: 600px;
  white-space: nowrap;
  display: flex;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  margin: 0 14.5rem
  `
  
  const Content = styled.div`
  scroll-snap-align: start;
    width: 20rem;
  margin: 0 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  
`

const Marker = styled.div`
  color: black;
  left: 140px;
  font-family: monospace;
`

const Image = styled.a`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
`

function Slideshow() {
  return (
    <Main>
        {items.map((item, index) => {
            return <Content key={index}>
                    <Marker>{index}</Marker>
                    <Image style={{ backgroundImage: item.css }}/>
                </Content>
        })}
    {/* </Content> */}
      {/* {({ css }, i) => (
        <Content>
          <Marker>{String(i).padStart(2, '0')}</Marker>
          <Image style={{ backgroundImage: css }} />
        </Content>
      )} */}
    {/* <div items={items} width={700} visible={3}>
      {({ css }, i) => (
        <Content>
          <Marker>{String(i).padStart(2, '0')}</Marker>
          <Image style={{ backgroundImage: css }} />
        </Content>
      )}
    </div> */}
  </Main>
  )
}

export default Slideshow