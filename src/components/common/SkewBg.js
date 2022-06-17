import styled from 'styled-components';

const SkewBg = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  min-height: 300px;
  background: ${props => props.theme.gradient};
  transform: skewY(-3deg);
  z-index: -1;
  pointer-events: none;

  @media ${props => props.theme.media.tablet} {
    width: unset;
    height: 90%;
    top: 100px;
    left: -16px;
    right: -16px;
    bottom: 0;
  }
`;

export default SkewBg;
