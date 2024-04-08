import React from 'react'

import styled from 'styled-components'
import { a } from 'react-spring'
import items from './Items.jsx'

const Main = styled.div`
  height: 850px;
  white-space: nowrap;
  display: flex;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  margin: 0 14.5rem
  `
  
  const Content = styled.div`
  scroll-snap-align: start;
  width: 35rem;
  margin: 0 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  
`

const Marker = styled.div`
  color: var(--secondary-text-color);
  left: 140px;
  // font-family: monospace;
  margin: 1rem 0;
`

const Image = styled.a`
  height: 40%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 35rem 350px;
  cursor: pointer;
  box-shadow: inset 0px 0px 50px rgba(0,0,0,0.4);
`

const ProjectTitle = styled.h2`
  color: var(--secondary-text-color);
  position: unset;
  font-size: 1.2rem;
  margin: 2rem 0;
  -webkit-text-fill-color: unset;
  background: unset;
  -webkit-background-clip: unset;
`

const Description = styled.p`
  width: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  white-space: wrap;
  line-height: 1.5rem;
  color: var(--secondary-text-color);
`

const BuiltUsing = styled.p`
  width: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  white-space: wrap;
  margin: 2rem 0;
  line-height: 1.5rem;
  color: var(--secondary-text-color);
`

function Slideshow() {
  return (
    <Main>
        {items.map((item, index) => {
          return <Content key={index}>
                  <Marker>{index + 1}{": " + item.blurb}</Marker>
                  <Image style={{ backgroundImage: item.css }} href={item.url}/>
                  <ProjectTitle>{item.title}</ProjectTitle>
                  <Description>{item.description}</Description>
                  <BuiltUsing>{item.tools}</BuiltUsing>
              </Content>
        })}
  </Main>
  )
}

export default Slideshow