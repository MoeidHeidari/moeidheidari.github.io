import React from 'react';

import Layout from '@components/Layout/Layout';
import SEO from '@components/seo';

import Home from '@components/Home/Home';
import About from '@components/About/About';
import Skills from '@components/Skills/Skills';
import Projects from '@components/Projects/Projects';
import CreativeCoding from '@components/CreativeCoding/CreativeCoding';
import Concepts from '@components/Concepts/Concepts';
import Contact from '@components/Contact/Contact';


const IndexPage = () => (
  
  <Layout>
    
    <SEO title="Moeid Heidari - Software Developer" />

    <Home />
    
    <About />
    {/* <Skills /> */}
    <Contact />
    
  </Layout>
);

export default IndexPage;
