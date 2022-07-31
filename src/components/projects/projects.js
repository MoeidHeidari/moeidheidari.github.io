import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';

const StyledBack = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  border-radius: 5px;
  border-color: #475289;
  border-width: thin;
  position: relative;

  background-color: ${props => props.theme.secondaryColor};

  padding-left: 20px;
  border-style: solid;
  padding-bottom: 20px;

 
`;
const TitleText = styled.h1`
  vertical-align: middle;
  font-weight: bold;
  font-size: 20px;
`;
const PublisherText = styled.h2`
  margin-top: -10px;
  font-weight: bold;
  font-size: 15px;
  color: #616ead;
`;

const AuthorsText = styled.h3`
  margin-top: -10px;

  font-size: 13px;
  color: #3e435c;
`;
const DOIText = styled.h4`
  margin-top: -10px;

  font-size: 13px;
  color: #3e435c;
`;
const PublishDate = styled.span`
  font-size: 15px;
`;

const ProjectItem = ({ title, description, year, address,longDescription }) => {
  return (
    
      <StyledBack>
        <PublishDate aria-label={`publish date ${year}`}>
          <FontAwesomeIcon color='gray' icon='calendar-alt' />
          &nbsp;&nbsp;{year}
        </PublishDate>
        <TitleText>{title}</TitleText>
        <PublisherText>{description}</PublisherText>
        <AuthorsText>{longDescription}</AuthorsText>
        <Link to={address}>
        <Button >
              Link to project
            </Button>
        </Link>
        
      </StyledBack>
    
  );
};

ProjectItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProjectItem;
