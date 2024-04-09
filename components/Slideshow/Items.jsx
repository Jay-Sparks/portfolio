import ArticoImg from '../../src/assets/Artico.png'
import WasteNotImg from '../../src/assets/Waste-Not.png'
import Tshirt from '../../src/assets/3dTshirt.png'
import cityZen from '../../src/assets/cityZenGame.png'
import island from '../../src/assets/3dIsland.png'


export default [
    {
      css: `url(${cityZen})`,
      height: 300,
      blurb: "3D multiplayer web app",
      title: "City Zen",
      description: "A full-stack multiplayer web-app built as part of a collaboration over 3 weeks. I created 3d assets using blender and took on a lead developer role, guiding the team through scrum ceremonies whilst building a significant portion of the front-end experience.",
      tools: "React.js, React-Three-fibre, Drei, React-three-rapier, Three.js, MongoDB, Express & Blender",
      github: ['https://github.com/saeidsaeity/BoardGame-FrontEnd', 'https://github.com/FrinkoTay/GameBoardBackEnd' ],
      url: 'https://city-zen.netlify.app/'
    },
    {
      css: `url(${ArticoImg})`,
      height: 300,
      blurb: "Full stack JS web app",
      title: "Artico",
      description: "A full stack responsive blogging and news web app, built to learn; test driven development (TDD), model view controller (MVC), Express, CI/CD, PostGreSQL and Node as part of the Northcoders full-stack software development course.",
      tools: "Node, express, postregsql, jest, supertest, TDD, CI/CD; and React, Javascript, axios & css",
      github: ['https://github.com/Jay-Sparks/Artico-fe'],
      url: 'https://artico-app-js.netlify.app/'

    },
    {
      css: `url(${Tshirt})`,
      height: 300,
      blurb: "Interactive 3D AI app",
      title: "mAI t-shirts",
      description: "A R3F and three.js web app built using openAIs dalle api to power logo and print designs for a t-shirt model, with a focus upon 3d interaction and 3rd party api integration.",
      tools: "React, three.js, react-three-fiber, Drei, Express,openA",
      github: ['https://github.com/Jay-Sparks/threejs_ai_tshirts'],
      url: 'https://threejs-tshirt-ai.netlify.app/'
    },
    {
      css: `url(${island})`,
      height: 300,
      blurb: "Single page 3D app",
      title: "Flying Island",
      description: "A R3F and three.js single page project built to learn and demonstrate 3D interactions, 3D asset imports and physics.",
      tools: "React, three.js, react-three-fiber, Drei, Tailwind",
      github: ['https://github.com/Jay-Sparks/threejs-island/tree/master' ],
      url: 'https://threejs-island.netlify.app/'
    },
    {
      css: `url(${WasteNotImg})`,
      height: 300,
      blurb: "Authenticated web app",
      title: "Waste not",
      description: "A responsive c.r.u.d web app that allows users to save a set of possible recipes they could cook. Users can login using their google email or email & password, provide the food currently in their kitchen and save favourite recipes to their account.",
      tools: "React, Node, Ajax & Firebase",
      github: ['https://github.com/Jay-Sparks/waste-not' ],
      url: 'https://waste-not-js.netlify.app/'
    }
  ]
  