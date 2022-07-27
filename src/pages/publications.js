import React from 'react';

import Layout from '@components/Layout/Layout';
import SEO from '@components/seo';
import PublicationItem from '@components/publications/PublicationItem';


const PublicationsPage = () => (
  <Layout>
    <SEO title='publications page' />
    
    
    <div className='container'>
    <h1>Publications</h1>
      <div>
      <PublicationItem DOI={'10.1109/MECO49872.2020.9134081'} address={'https://ieeexplore.ieee.org/document/9134081'} date={'2020/6/8'} authors={'Omar T Mohammed, Moeid S Heidari, Alexey A Paznikov'} title={'Mathematical computations based on a pre-trained ai model and graph traversal'} publisher={'2020 9th Mediterranean Conference on Embedded Computing (MECO)'} />
      <PublicationItem DOI={'10.1109/SCM50615.2020.9198759'} address={'https://ieeexplore.ieee.org/document/9198759'} date={'2020/5/27'} authors={'Moeid S Heidari,Omar T Mohammed, Alexey A Paznikov, Mikhail S Kupriyanov'} title={'Towards optimization of big numbers computation through an AI pre-trained model and graph traversal'} publisher={'2020 XXIII International Conference on Soft Computing and Measurements (SCM)'} />
      <PublicationItem DOI={'10.1109/NeuroNT53022.2021.9472809'} address={'https://ieeexplore.ieee.org/document/9472809'} date={'2020/6/8'} authors={'Omar T Mohammed, Moeid S Heidari, Alexey A Paznikov'} title={'Using OpenMP to Optimize Model Training Process in Machine Learning Algorithms'} publisher={' 2021 II International Conference on Neural Networks and Neurotechnologies (NeuroNT)'} />
      <PublicationItem DOI={'https://doi.org/10.1016/j.procs.2021.04.221'} address={'https://www.sciencedirect.com/science/article/pii/S187705092101070X'} date={'2021.04.221'} authors={'Moeid S Heidari,Omar T Mohammed, Alexey A Paznikov'} title={'Optimizing regular computations based on neural networks and Graph Traversal'} publisher={'14th International Symposium "Intelligent Systems'} />
      <PublicationItem DOI={''} address={'https://www.researchgate.net/profile/Omar-Mohammed-27/publication/339936011_A_BETTER_HUMAN-MACHINE_INTERACTION/links/5e6d3d37299bf12e23c73d45/A-BETTER-HUMAN-MACHINE-INTERACTION.pdf'} date={'2019/11/25'} authors={'Moeid Heidari Sayed,Omar Taha Mohammed Mohammed'} title={'A better Human-Machine interaction'} publisher={'Researchgate'} />
      

      </div>
    </div>
  </Layout>
);

export default PublicationsPage;
