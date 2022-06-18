import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const SplitLayoutWrapper = styled.section`
  ${p => p.theme.spacing.sectionBottom};

  & article:first-of-type {
    margin-top: 15px;
  }

  display: grid;
  grid-template-columns: minmax(900px, 1fr) 1fr;
  grid-column-gap: 70px;
  grid-template-areas: 'post side';

  .layout__content {
    grid-area: side;
  }
  .layout__aside {

    grid-area: post ;
  }

  @media ${props => props.theme.media.fablet} {
    /* setting g-t-c to 1fr 1fr because in mobile 
    version minmax was breaking the layout */
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 50px;
    grid-template-areas:
      'post post'
      'side side';
  }

  .sticky__aside {
    position: sticky;
    top: 100px;
  }
`;

const SplitLayout = ({ aside, content }) => (
  <SplitLayoutWrapper>
     <section className="layout__aside">
      <aside className="sticky__aside">{aside && aside}</aside>
    </section>
    <section className="layout__content">{content && content}</section>
   
  </SplitLayoutWrapper>
);

SplitLayout.propTypes = {
  content: PropTypes.node.isRequired,
  aside: PropTypes.node.isRequired,
};

export default SplitLayout;
