import ArticoImg from '../../src/assets/Artico.png'
import DigitalPrivateWealthImg from '../../src/assets/digitalPrivateWealth.jpg'
import WasteNotImg from '../../src/assets/Waste-Not.png'
import Tshirt from '../../src/assets/3dTshirt.png'
import photoGallery from '../../src/assets/photoGallery.png'


export default [
    {
      image: DigitalPrivateWealthImg,
      category: 'PRODUCT',
      height: 300,
      blurb: 'Digital private wealth onboarding experience',
      title: 'Digital Private Wealth',
      description: 'A private wealth prototype that takes customers from onboarding and simulated identity verification through an adaptive fact-find, explainable financial profile, targeted support and adviser pathway.',
      tools: 'Expo, React Native, TypeScript, Expo Router, Zustand, Zod, Jest & React Native Testing Library',
      github: ['https://github.com/Jay-Sparks/digital-private-wealth'],
      url: 'https://digital-private-wealth.netlify.app/'
    },
    {
      image: ArticoImg,
      category: 'WEB APP',
      height: 300,
      blurb: "Full stack JS web app",
      title: "Artico",
      description: "A full stack responsive blogging and news web app, built to learn; test driven development (TDD), model view controller (MVC), Express, CI/CD, PostGreSQL and Node as part of the Northcoders full-stack software development course.",
      tools: "Node, express, postregsql, jest, supertest, TDD, CI/CD; and React, Javascript, axios & css",
      github: ['https://github.com/Jay-Sparks/Artico-fe'],
      url: 'https://artico-app-js.netlify.app/'
    },
    {
      image: WasteNotImg,
      category: 'WEB APP',
      height: 300,
      blurb: "Authenticated web app",
      title: "Waste Not",
      description: "A responsive c.r.u.d web app that allows users to save a set of possible recipes they could cook. Users can login using their google email or email & password, provide the food currently in their kitchen and save favourite recipes to their account.",
      tools: "React, Node, Ajax & Firebase",
      github: ['https://github.com/Jay-Sparks/waste-not' ],
      url: 'https://waste-not-js.netlify.app/'
    },
    {
      image: photoGallery,
      category: 'EXPERIMENT',
      height: 300,
      blurb: 'Full-stack gallery experiment',
      title: 'T3 Photo Gallery',
      description: "A TypeScript and Next.js gallery built while learning a production-oriented stack, including authentication, storage, rate limiting and analytics.",
      tools: 'Next.js, TypeScript, Tailwind, Drizzle, Vercel, Clerk, Upstash, Sentry & PostHog',
      github: ['https://github.com/Jay-Sparks/t3gallery'],
      url: 'https://t3gallery-eta-red.vercel.app/'
    },
    {
      image: Tshirt,
      category: 'INTERACTIVE',
      height: 300,
      blurb: "Interactive 3D AI app",
      title: "mAI t-shirts",
      description: "A R3F and three.js web app built using openAIs dalle api to power logo and print designs for a t-shirt model, with a focus upon 3d interaction and 3rd party api integration.",
      tools: "React, three.js, react-three-fiber, Drei, Express,openAI",
      github: ['https://github.com/Jay-Sparks/threejs_ai_tshirts'],
      url: 'https://threejs-tshirt-ai.netlify.app/'
    },
  ]
