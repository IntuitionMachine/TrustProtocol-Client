import styled from "styled-components";
import { MediaTemplate, MediaTemplateType } from "../../utils/MediaTemplate";
import "./bob.css";

const media = MediaTemplate as MediaTemplateType;

export const Wrapper = styled.div`
  padding: 100px 20px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
`;

export const SuccessWrapper = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const Heading = styled.div`
  font-size: 80px;
  text-align: center;
  ${media.desktop`
    color: lime;
  `}
  ${media.tablet`
    color: yellow;
  `}
  ${media.phone`
    color: pink;
    font-size: 45px;
  `}
`;

export const CoinWrapper = styled.div`
  padding-top: 100px;
  ${media.phone`
    padding-top: 50px;
  `}
`;

export const Address = styled.div`
  font-family: Inconsolata;
  font-size: 20px;
  margin-top: 4px;
`;

export const Copy = styled.div`
  margin-top: 100px;
`;

export const CoinImage = styled.img`
  width: 150px;
  height: 150px;
  animation-name: hvr-bob-float, hvr-bob;
  imation-duration: .3s, 1.5s;
  animation-delay: 0s, .3s;
  animation-timing-function: ease-out, ease-in-out;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: forwards;
  animation-direction: normal, alternate;

  ${media.phone`
    width: 80px;
    height: 80px;
  `}
`;

export const ReferralWrapper = styled.div`
  margin-top: 100px;
  padding: 50px;
  max-width: 800px;
  border: 2px dashed #fff;
  border-radius: 10px;
`;

export const ShareIcon = styled.a`
  padding: 20px;
  font-size: 30px;
  width: 30px;
  height: 30px;
  text-align: center;
  text-decoration: none;
  background: #3B5998;
  color: white;
  border-radius: 50px;

  &:hover {
    opacity: 0.7;
  }
`;