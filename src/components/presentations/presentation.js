import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';

const StyledBack = styled.div`


  :hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;



const AwardImage = styled.img`
width:50px;
margin-left:-40px;
margin-top:-10px;

`

const Typetext = styled.h1`
margin-top:-20px;
font-weight:40px;
font-size:30px;

`
const IssuedByText = styled.h2`
font-weight:10px;
font-size:15px;

`

const TitleText = styled.h2`
font-weight:20px;
font-size:20px;
margin-bottom:10px;
`


const PresentationItem = ({ type, issuedBy, title, image, link }) => {
    return (
        <Link to={link}>

            <StyledBack>
                <img src={image} width="600"></img>
                
                


            </StyledBack>
        </Link>

    );
}



export default PresentationItem;
