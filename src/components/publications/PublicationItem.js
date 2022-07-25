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

  background-color: ${props => props.theme.secondaryColor};

  padding-left: 20px;
  border-style: solid;

  :hover {
    transform: scale(1.01);
    cursor: pointer;
    background-color: var(--logo);
  }
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

const PublicationItem = ({ title, publisher, authors, date, address,DOI }) => {
  return (
    <Link to={address}>
      <StyledBack>
        <PublishDate aria-label={`publish date ${date}`}>
          <FontAwesomeIcon color='gray' icon='calendar-alt' />
          &nbsp;&nbsp;{date}
        </PublishDate>
        <TitleText>{title}</TitleText>
        <PublisherText>{publisher}</PublisherText>
        <AuthorsText>{authors}</AuthorsText>
        <DOIText>DOI: {DOI}</DOIText>
      </StyledBack>
    </Link>
  );
};

PublicationItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PublicationItem;
