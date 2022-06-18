import React, { Component } from 'react';
import styled from 'styled-components';

import PageHeader from '@src/components/common/PageHeader';
import { Hidden } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import Flex from '@src/components/common/Flex';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Tabs from 'react-bootstrap/Tabs';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';

import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

const SkillsWrapper = styled.section`
  ${props => props.theme.spacing.sectionBottom};
  position: relative;
  .skill__icons {
    padding: 30px 0;
    @media ${props => props.theme.media.tablet} {
      padding: 10px 0;
    }

    svg {
      color: ${props => props.theme.primaryColor};
    }
  }
  .skills__word-clouds {
    @media ${props => props.theme.media.tablet} {
      display: none;
    }

    p {
      position: absolute;
      color: ${props => props.theme.accentColor};
      z-index: -1;
      left: 0;
      right: 0;
      font-weight: 900;
      user-select: none;
    }
    z-index: -1;
  }
`;

const WordClouds = () => {
  return (
    <Parallax
      y={['25px', '0px']}
      slowerScrollRate={true}
      aria-hidden="true"
      className="skills__word-clouds"
    >
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="Development" title="Development">
        <Container>
        <Row>
          <Col xs>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar   value={90} text="Nodejs" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor:"#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 1 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar value={80} text="Typescript" styles={buildStyles({textSize:'12px',
          backgroundColor: "#6A98F0",
          textColor: "#fff",
          pathColor: "#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 2 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar value={65} text="C++" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 3 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar  value={60} text="Java" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 3 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar  value={40} text="Golang" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
        </Row>
      </Container>
        </Tab>
        <Tab eventKey="DevOps" title="DevOps">
        <Container>
        <Row>
          <Col xs>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar  value={100} text="Kurdish" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 1 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar value={100} text="Persian" styles={buildStyles({textSize:'12px',
          backgroundColor: "#6A98F0",
          textColor: "#fff",
          pathColor: "#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 2 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar  value={75} text="English" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 3 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar  value={20} text="Russian" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor:"#6A98F0",
          trailColor: "transparent"})}/>
          </div>
          </Col>
        </Row>
      </Container>
        </Tab>
        <Tab eventKey="Foundamentals" title="Foundamentals">
        <Container>
        <Row>
          <Col xs>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar background backgroundPadding={6} value={0} text="Kurdish" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 1 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar background backgroundPadding={6} value={0} text="Persian" styles={buildStyles({textSize:'12px',
          backgroundColor: "#6A98F0",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 2 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar background backgroundPadding={6} value={0} text="English" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 3 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar background backgroundPadding={6} value={0} text="Russian" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"})}/>
          </div>
          </Col>
        </Row>
      </Container>
        </Tab>
      </Tabs>
    </Parallax>
  );
};

const Languages = () => {
  return (
    <Parallax
      y={['25px', '0px']}
      slowerScrollRate={true}
      aria-hidden="true"
      className="skills__word-clouds"
    >


      <Container>
        <Row>
          <Col xs>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar background backgroundPadding={6} value={100} text="Kurdish" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 1 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar background backgroundPadding={6} value={100} text="Persian" styles={buildStyles({textSize:'12px',
          backgroundColor: "#6A98F0",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 2 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar background backgroundPadding={6} value={75} text="English" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"})}/>
          </div>
          </Col>
          <Col xs={{ order: 3 }}>
          <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar background backgroundPadding={6} value={20} text="Russian" styles={buildStyles({textSize:'12px',
          backgroundColor:  "#6A98F0",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"})}/>
          </div>
          </Col>
        </Row>
      </Container>
    </Parallax>
  );
}

const Skills = () => (
  <SkillsWrapper>
    <ParallaxProvider>
      <PageHeader>My Skillsets</PageHeader>
        <WordClouds />
     
    </ParallaxProvider>
    <ParallaxProvider>
      <PageHeader>Languages</PageHeader>



     
        <Languages />
     
    </ParallaxProvider>
  </SkillsWrapper>

);

export default Skills;
