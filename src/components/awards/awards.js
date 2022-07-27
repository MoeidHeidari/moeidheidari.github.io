import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';

const StyledBack = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  border-radius: 5px;
  border-color: #FFFFFF;
  border-width: thin;

  background-image: linear-gradient(268.61deg, #E6AB15 12.42%, #46855F 84.61%);

  padding-left: 20px;
  border-style: solid;

  :hover {
    transform: scale(1.01);
    cursor: pointer;
    background-color: var(--logo);
  }
`;



const AwardImage=styled.img`
width:50px;
margin-left:-40px;
margin-top:-10px;

`

const Typetext=styled.h1`
margin-top:-20px;
font-weight:40px;
font-size:30px;

`
const IssuedByText=styled.h2`
font-weight:10px;
font-size:15px;

`

const TitleText=styled.h2`
font-weight:20px;
font-size:20px;
margin-bottom:10px;
`


const AwardItem=({type,issuedBy,title,image,link}) =>{
return (
    <Link to={link}>

<StyledBack>
    
    <AwardImage src={image}/>
    <div className='container'>
        <Typetext className='raw'> {type}</Typetext>
        <TitleText className='raw'> {title}</TitleText>
        <IssuedByText className='raw'> {issuedBy}</IssuedByText>
    </div>
      </StyledBack>
    </Link>

);
}



export default AwardItem;
