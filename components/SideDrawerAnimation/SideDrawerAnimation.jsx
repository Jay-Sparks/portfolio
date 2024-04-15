import React, { useState } from 'react';
import { animated, useTransition } from '@react-spring/web';

import styles from './SideDrawerAnimation.module.css';

const SideDrawerAnimation = ({ children, isMenu }) => {

  const [isShowing, setIsShowing] = useState(false);


  const items = React.Children.toArray(children);
  const transitions = useTransition(isMenu, {
    config: { mass: 5, tension: 1000, friction: 150 },
    from: { opacity: 0, x: -100, width: '0%', zIndex: 105 },
    enter: { opacity: 1, x: 0, width: '0&', zIndex: 105 },
    leave: { opacity: 0.5, x: 0, width: '0%', zIndex: 105 },
    trail: 100,
  });

  const opacityTransition = useTransition(isShowing, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <>
    {opacityTransition((style, item) => item && <Box style={style} />)}
      {transitions(
        (style, item) =>
          item && (
            <animated.div style={style}>
              {items}
            </animated.div>
          )
      )}
    </>
  );
  
//   transitions(({ ...style }, items) => (
//       <animated.div style={{...style}}>{items}</animated.div>
//   ));
};

export default SideDrawerAnimation;
