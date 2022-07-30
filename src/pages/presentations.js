import React from 'react';

import Layout from '@components/Layout/Layout';
import SEO from '@components/seo';
import PresentationItem from '@components/presentations/presentation';
import pres1 from '@src/static/images/pres-1.png';
import pres2 from '@src/static/images/pres-2.png';
import pres3 from '@src/static/images/pres-3.png';
import pres4 from '@src/static/images/pres-4.png';
import pres5 from '@src/static/images/pres-5.png';
import pres6 from '@src/static/images/pres-6.png';
import pres7 from '@src/static/images/pres-7.png';

const PresentationsPage = () => (
    <Layout>
        <SEO title='Awards Page' />

        <div class="container">
            <div class="row">
                <h1>Presentations & lectures</h1>
                <div class="col-sm ">
                    <PresentationItem
                        place={'LETI'}
                        date={'24-08-2022'}
                        title={'Best Section Oral Presentation Award'}
                        image={pres1}
                        link={'https://prezi.com/i/hhth4mfbc5xa/'}
                    />

                </div>
                <div class="col-sm ">
                    <PresentationItem
                        place={'LETI'}
                        date={'24-08-2022'}
                        title={'Best Section Oral Presentation Award'}
                        image={pres2}
                        link={'https://prezi.com/i/y4fmunfskt6g/'}
                    />

                </div>
            </div>
            <div class="row" style={{marginTop: '20px'}}>
                <div class="col-sm ">
                    <PresentationItem
                        place={'LETI'}
                        date={'24-08-2022'}
                        title={'Best Section Oral Presentation Award'}
                        image={pres3}
                        link={'https://prezi.com/i/imsom64sutfh/'}
                    />

                </div>
                <div class="col-sm ">
                    <PresentationItem
                        place={'LETI'}
                        date={'24-08-2022'}
                        title={'Best Section Oral Presentation Award'}
                        image={pres4}
                        link={'https://prezi.com/i/vuw2tze6t6ro/'}
                    />

                </div>
            </div>
            <div class="row" style={{marginTop: '20px'}}>
                <div class="col-sm ">
                    <PresentationItem
                        place={'LETI'}
                        date={'24-08-2022'}
                        title={'Best Section Oral Presentation Award'}
                        image={pres5}
                        link={'https://prezi.com/i/igaheutr4tzb/'}
                    />

                </div>
                <div class="col-sm ">
                    <PresentationItem
                        place={'LETI'}
                        date={'24-08-2022'}
                        title={'Best Section Oral Presentation Award'}
                        image={pres6}
                        link={'https://prezi.com/i/egotnotjm-yw/'}
                    />

                </div>
            </div>
            <div class="row" style={{marginTop: '20px'}}>
                <div class="col-sm ">
                    <PresentationItem
                        place={'LETI'}
                        date={'24-08-2022'}
                        title={'Best Section Oral Presentation Award'}
                        image={pres7}
                        link={'https://prezi.com/i/1yn7jxxfwknz/'}
                    />

                </div>
            </div>

        </div>

    </Layout>
);

export default PresentationsPage;
