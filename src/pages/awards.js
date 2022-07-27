import React from 'react';

import Layout from '@components/Layout/Layout';
import SEO from '@components/seo';
import AwardItem from '@components/awards/awards';
import awardImage from '@src/static/images/award.svg';
import honor from '@src/static/images/honor2.png';

const AwardsPage = () => (
  <Layout>
    <SEO title='Awards Page' />

    




    <div class="container">
  <div class="row">
    <h1>Honor & Awards</h1>
    <div class="col-sm ">
    <AwardItem
            type={'conference paper'}
            issuedBy={
              'XIII Majorov International Conference on Software Engineering and Computer Systems · Dec 2021'
            }
            title={'Best Section Oral Presentation Award'}
            image={awardImage}
            link={'https://2021.micsecs.org/'}
          />
          <AwardItem
            type={'Conference speech'}
            issuedBy={
              'Lomonosove Moscow State University · Dec 2020'
            }
            title={'14th International Symposium “Intelligent Systems – 2020” (INTELS 20)'}
            link={'https://lomonosov-msu.ru/eng/event/6132/menu/'}
            image={awardImage}
          />
          <AwardItem
            type={'conference paper'}
            issuedBy={
              "11th Majorov International Conference on Software Engineering and Computer Systems"
            }
            title={'Using OpenMP to optimize model training process in machine learning algorithms'}
            link={'http://ceur-ws.org/Vol-2590/'}
            image={awardImage}
          />
          
    </div>
    
    <div className='col-sm'>
    <AwardItem
            type={'International student grant'}
            issuedBy={
              'Saint Petersburg State Electrotechnical University "LETI"​'
            }
            title={'Best International student'}
            link={'https://etu.ru/en/university/'}
            image={awardImage}
          />
          <AwardItem
            type={'Conference presentation'}
            issuedBy={
              'The 9th Mediterranean conference on Embeded Computing · Jun 2020"​'
            }
            title={'Mathematical computations based on a pre-trained ai model and graph traversal'}
            link={'https://ieeexplore.ieee.org/xpl/conhome/9125448/proceeding'}
            image={awardImage}
          />
           <AwardItem
            type={'Competition'}
            issuedBy={
              'Technical and Vocational University of Sanandaj-yazdanpanah​'
            }
            title={'Best student of the university in student day festival'}
            link={''}
            image={awardImage}
          />
        </div>
    </div>
  
</div>

  </Layout>
);

export default AwardsPage;
