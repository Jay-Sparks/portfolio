import React from 'react';
import styled from 'styled-components';
import items from './Items.jsx';

import styles from './Slideshow.module.css'

const Main = styled.ul`
  height: 80%;
  white-space: nowrap;
  display: flex;
  // transform-origin: center center;
  // transform: scale(1);
  // transition: transform 0.5s;
`;

const Content = styled.li`
  scroll-snap-align: start;
  // width: 100%;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Marker = styled.div`
  color: var(--secondary-text-color);
  left: 140px;
  // font-family: monospace;
`;

const Image = styled.a`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32rem 340px;
  cursor: pointer;
  // box-shadow: inset 0px 0px 50px rgba(0,0,0,0.4);
`;

const ProjectTitle = styled.h2`
  color: var(--secondary-text-color);
  position: unset;
  font-size: 1.2rem;
  -webkit-text-fill-color: unset;
  background: unset;
  -webkit-background-clip: unset;
`;

const Description = styled.p`
  width: 100%;
  height: 4.5rem;
  margin-block-start: 0;
  margin-block-end: 0;
  white-space: wrap;
  line-height: 1.5rem;
  color: var(--secondary-text-color);
`;

const BuiltUsing = styled.p`
  width: 100%;
  height: 3rem;
  margin-block-start: 0;
  margin-block-end: 0;
  white-space: wrap;
  margin: 2rem 0;
  line-height: 1.5rem;
  color: var(--secondary-text-color);
`;

function Slideshow() {
  return (
    <Main>
      {items.map((item, index) => {
        return (
          <Content key={index} className={styles.slideshowWrap}>
            <>
              <Marker>
                {index + 1}
                {': ' + item.blurb}
              </Marker>
              <Image style={{ backgroundImage: item.css }} href={item.url} />
              <ProjectTitle>{item.title}</ProjectTitle>
              <Description>{item.description}</Description>
              <BuiltUsing>{item.tools}</BuiltUsing>
            </>
          </Content>
        );
      })}
    </Main>
  );
}

export default Slideshow;
