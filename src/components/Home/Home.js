import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import svgRect from '@src/static/home_rect.svg';
import { useEffect } from 'react';
import { HeroCard } from './HeroCard';
import { HomeWrapper, Intro } from './Home.style';
import Aos from 'aos';
import IconLink from '@common/IconLink';
import PageHeader from '@common/PageHeader';
import Flex from '@common/Flex';
import Button from '@common/Button';

import { Card, CardIcon, CardText, CardTitle } from '@common/Card';

const ThingsILove = () => (
  <Flex justify="space-between" align="center">
    <Card>

      <CardTitle>Architecture</CardTitle>
      <CardText>
        I design micro-service and serverless architectures
      </CardText>
    </Card>

    <Card>

      <CardTitle>Nodejs</CardTitle>
      <CardText>
        I prefer to use nodejs for backend development
      </CardText>
    </Card>

    <Card>

      <CardTitle>Typescript</CardTitle>
      <CardText>
        Typescript is my prefered language for backend and frontend development
      </CardText>
    </Card>

    <Card>

      <CardTitle>DevOps</CardTitle>
      <CardText>
        I love playing a role in devops and deployment automation sometimes
      </CardText>
    </Card>
  </Flex>
);

const Home = () => {
  
  return (
   
    <HomeWrapper id="home">
      
      <img className="svg-rect" src={svgRect} alt=""></img>

      <Intro>
        {/* <Parallax y={[50, -50]} className="home__text"> */}
        <div className="home__text">
          <p>Hello, I’m</p>
          <h1>Moeid</h1>
          <p className="adjust">SOFTWARE DEVELOPER</p>

          <div className="home__CTA">
            <Button className="cta" as="a" href="https://drive.google.com/uc?export=download&id=1Z1azz2738RxDt7pHSPgXhzsx3fdr3-jf">
              Download Resume
            </Button>

            <div className="home__social">
              <IconLink
                label="github"
                icon={['fab', 'github']}
                href="//github.com/moeidheidari"
              />
             
            </div>
          </div>
          
        </div>
        
        {/* </Parallax> */}
        <HeroCard />
        
      </Intro>

      {/* Things I LOVE */}
      <PageHeader style={{ marginBottom: 30 }}>
        Things I love <i className="fas fa-heart" />
      </PageHeader>
      
      <ThingsILove />
      
    </HomeWrapper>
  );
};

export default Home;
