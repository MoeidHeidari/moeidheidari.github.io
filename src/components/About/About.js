import React from 'react';

import SkewBg from '@common/SkewBg';
import PageHeader from '@common/PageHeader';
import Flex from '@common/Flex';

import Quote from './Quote';
import Avatar from './Avatar';

import { AboutWrapper, AboutInfo } from './About.style';

const About = () => {
  return (
    <AboutWrapper id="about">
      <PageHeader>About Me</PageHeader>
      <SkewBg />
      <AboutInfo>
        <div>
          <Avatar src="hfest_avatar_2.jpg" />
        </div>
        <p>
        As a solution-driven IT professional with 10+ years of experience in creating smart, next- generation software for multiple platforms such as mobile, web, desktop, as well as video games for well-established organizations, 
        I look forward to bringing my strong technical and analytical skills to a higher level. <br />
        In my career, I am looking to enhance my technical skills in backend development, SOLID architecture design, Micro-service pattern,Data-driven development, test-driven development,deployment automation pipeline, cloud-native programming, and provisioning,      
        </p>
      </AboutInfo>

      
    </AboutWrapper>
  );
};

export default About;
